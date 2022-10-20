#include <stdio.h>
#include <stdlib.h>

int main()
{
    int n, i=2;
    printf("enter a number ");
    scanf("%d",& n);
    y:
    if( i <= n)
    {
        n % i != 0 ? printf("%d it is a prime number",i) : printf("%d it is not a prime number",i);
        i++;
        goto y;
    }
    return 0;
}