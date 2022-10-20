#include<stdio.h>

int main()
{
int n=0,m=0,rd=0;
printf("enter the no of days ");
scanf("%d",&n);
m=n/30;
rd=n%30;
printf("Months=%d",m);
printf("\n Remaining days=%d",rd);

return 0;
}