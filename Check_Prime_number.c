#include <stdio.h>
#include <stdlib.h>

int main()
{
    int n, i;
    printf("enter a number ");
    scanf("%d",& n);
    for (i = 2; i <= n; i++)
    {
        n % i != 0 ? printf("it is a prime number") : printf("it is a prime number");
    }
    return 0;
}