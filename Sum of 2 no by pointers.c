

#include<stdio.h>

int main()

{
int a , b , *ptr , *qtr, sum;
printf("enter the value of a");
scanf("%d",&a);
printf("enter the value of b");
scanf("%d",&b);
ptr=&a;
qtr=&b;
sum= *ptr + *qtr;
printf("%d",sum);

return 0;
}