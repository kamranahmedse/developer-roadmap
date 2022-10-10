#include<stdio.h>
void fibo(int);
void main()
{
   int n;
   printf("Enter a number to generate fibonacci series for first n terms:",n);
   scanf("%d",&n);
   fibo(n);
}

void fibo(int n)
{
   int i,c=0;
   int a=0;
   int b=1;
   printf("\nFibonacci series for %d terms:-\n",n);
   for(i=0;i<n;i++)
   {
       printf("%d ",c);
       a=b;
       b=c;
       c=a+b;
   }
}
