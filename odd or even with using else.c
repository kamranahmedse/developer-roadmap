#include<stdio.h>

int main()
{
int no;
printf("enter the number ");
scanf("%d",&no);
if(no%2!=0)
{
    printf("the given number is odd ");
}
else 
{
    printf("the given number is even");
}
return 0;
}