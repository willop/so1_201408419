# #!/bin/bash

totallogs=0
errores=0
sumas=0
restas=0
multis=0
divs=0
registros=" "
echo -e "\n\n\n\n*************************************************************************"
echo "****************************** Reporte **********************************"
echo "*************************************************************************"
echo -e "Wilfred Stewart Perez Solorzano\n201408419\n\n"



while IFS=; read -r line
do

sum=$(( $sum + 1 ))

if [[ "$line" == *"ERROR"* ]]; then
    errores=$(( $errores + 1 ))
fi
if [[ "$line" == *"+"* ]]; then
    sumas=$(( $sumas + 1 ))
fi
if [[ "$line" == *"%-%"* ]]; then
    restas=$(( $restas + 1 ))
fi
if [[ "$line" == *"X"* ]]; then
    multis=$(( $multis + 1 ))
fi
if [[ "$line" == *"/"* ]]; then
    divs=$(( $divs + 1 ))
fi
if [[ "$line" == *"2023-02-18"* ]]; then
    registros+=$line" \n "
fi

done < /script.txt

echo -e  "\n1. Cantidad total de logs registrados"
echo "   = $totallogs"
echo -e  "\n2. Cantidad total de operaciones que resultaron en error."
echo "   = $errores"
echo -e  "\n3. Cantidad de operaciones por separado, es decir, número de sumas, restas, multiplicaciones y divisiones"
echo "   sumas            = $sumas"
echo "   restas           = $restas"
echo "   multiplicaciones = $multis"
echo "   divisiones       = $divs"
echo -e "\n4. Mostrar los logs del día de hoy"
echo -e "\nNo.reg. ; Num1 ; Num2 ; Operador ; Resultado ; Fecha\n $registros"
