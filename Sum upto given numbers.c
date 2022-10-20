#include<stdio.h>

int main()
{
int no,i,sum=0;
printf("enter the number");
scanf("%d",&no);
for(i=1;i<=no;i++)
{
printf("%d",i);
sum+=i;
}
printf("\n%d",sum);
return 0;
}