#include<stdio.h>

int main()
{
int no,i=1,square,cube,sum_of_square=0,sum_of_cube=0;
printf("enter a number");
scanf("%d",&no);
while(i<=no)
{
   square=i*i;
   cube=i*i*i;
   sum_of_square=sum_of_square+square;
   sum_of_cube=sum_of_cube+cube;
   i++;
}
printf(" sum of square %d of natural numbers id %d",no,sum_of_square);
printf("\n  sum of cube %d of natural numbers id %d",no,sum_of_cube);

return 0;
}