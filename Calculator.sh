#!/bin/bash

echo "Enter two numbers: "
read a
read b

#input type of operation

echo "Enter your choice: "
echo "1. Addition"
echo "2. Substraction"
echo "3. Multiplication"
echo "4. Division"
read ch

#Acting on the user input

case $ch in
   1) res=`echo $a + $b | bc`
   ;;
   2) res=`echo $a - $b | bc`
   ;;
   3) res=`echo $a \* $b | bc`
   ;;
   4) res=`echo "scale=2; $a / $b" | bc`
   ;;
esac

#Printing result
echo "Result: $res"

