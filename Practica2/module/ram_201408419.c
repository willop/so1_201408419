#include <linux/module.h>
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/fs.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <asm/uaccess.h>

#define PROCFS_NAME "procesox"

static int OS2_show(struct seq_file *m, void *v){
seq_printf(m, "Hola mundo\n");
return 0;
}

static int OS2_open(struct inode *inode, struct file *file){
return single_open(file, OS2_show, NULL);
}

static const struct proc_ops OS2_fops = {
//.owner = THIS_MODULE,
.proc_open = OS2_open,
.proc_read = seq_read
//.llseek = seq_lseek,
//.release = single_release,
};

static int __init OS2_init(void){
printk(KERN_INFO "Cargando modulo.\r\n");
proc_create(PROCFS_NAME, 0, NULL, &OS2_fops);
printk(KERN_INFO "Completado. Procceso: /proc/%s.\r\n", PROCFS_NAME);
return 0;
}

static void __exit OS2_exit(void){
remove_proc_entry(PROCFS_NAME, NULL);
printk(KERN_INFO "Modulo deshabilitado.\r\n");
}

module_init(OS2_init);
module_exit(OS2_exit);

MODULE_LICENSE("GPL");