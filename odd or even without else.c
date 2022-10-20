#include<stdio.h>

int main()
{
int no,result,odd,even;
printf("enter a number ");
scanf("%d",&no);
no%2!=0 ?printf("the given no is odd ") : printf("the given no is even");
return 0;
}