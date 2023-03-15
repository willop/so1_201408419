#include <linux/module.h>
// para usar KERN_INFO
#include <linux/kernel.h>

//Header para los macros module_init y module_exit
#include <linux/init.h>
//Header necesario porque se usara proc_fs
#include <linux/proc_fs.h>
/* for copy_from_user */
#include <asm/uaccess.h>
/* Header para usar la lib seq_file y manejar el archivo en /proc*/
#include <linux/seq_file.h>

#include <linux/hugetlb.h>

#include <linux/sysinfo.h>
#include <linux/seq_file.h>
#include <linux/swap.h>


MODULE_DESCRIPTION("Creacion de modulo, Laboratorio Sistemas Operativos 1");
MODULE_AUTHOR("Wilfred Stewart Perez Solorzano");

//struct cpu_id_t data;  

//Funcion que se ejecutara que se lea el archivo con el comando CAT
static int escribir_archivo(struct seq_file *archivo, void *v)
{
    // usando las funciones de sysinfo
    struct sysinfo libsys_info;
    unsigned long totalram;
    unsigned long freeram;
    unsigned long disponible;
    unsigned long resta;
    unsigned long multiplicacion;
    unsigned long usoram;
    si_meminfo(&libsys_info);

    totalram = libsys_info.totalram*(unsigned long long)libsys_info.mem_unit / 1024;
    freeram = libsys_info.freeram *(unsigned long long)libsys_info.mem_unit / 1024;
    disponible = si_mem_available() *(unsigned long long)libsys_info.mem_unit / 1024;

    resta = totalram - freeram;
    multiplicacion = resta * 100;

    usoram = multiplicacion/totalram;

    unsigned int eax=11,ebx=0,ecx=1,edx=0;
    unsigned int cores =1 ,threads =1;

asm volatile("cpuid"
        : "=a" (eax),
          "=b" (ebx),
          "=c" (ecx),
          "=d" (edx)
        : "0" (eax), "2" (ecx)
        : );

    //printf("Cores: %d\nThreads: %d\nActual thread: %d\n",eax,ebx,edx);
    //printf("Processor model is `%s'\n", data.cpu_codename);
    seq_printf(archivo, "{\n\"RAM\": %ld,\n \"FREE\": %ld ,\n \"USADA\":%ld,\n \"Cores\": %d,\n \"Threads\": %d,\n \"Actual_thread\": %d\n}", totalram,freeram,usoram,eax,ebx,edx);
    //seq_printf(archivo, "{\n\"RAM\": %ld,\n \"FREE\": %ld ,\n \"USADA\":%ld,\n \"CPUNAME\":%s}", totalram,freeram,usoram, data.cpu_codename);
    return 0;
}

//Funcion que se ejecutara cada vez que se lea el archivo con el comando CAT
static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_archivo, NULL);
}

//Si el kernel es 5.6 o mayor se usa la estructura proc_ops
static struct proc_ops operaciones =
{
    .proc_open = al_abrir,
    .proc_read = seq_read
};

//Funcion a ejecuta al insertar el modulo en el kernel con insmod
static int _insert(void)
{
    proc_create("ram_201408419", 0, NULL, &operaciones);
    printk(KERN_INFO "201408419\n"); //imprimiendo carnet al usar insmod
    return 0;
}

//Funcion a ejecuta al remover el modulo del kernel con rmmod
static void _remove(void)
{
    remove_proc_entry("ram_201408419", NULL);
    printk(KERN_INFO "Sistemas operativos\n");  //Imprimiendo el nombre del curso al usar rmmod
}

module_init(_insert);
module_exit(_remove);

MODULE_LICENSE("GPL");