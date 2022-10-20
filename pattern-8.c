#include <stdio.h>

int main()
{
    int i, j, n, s;
    printf("enter the value of n");
    scanf("%d", &n);
    for (i = 1; i <= n; i++)
    {

        for (s = 1; s <= n - i; s++)
        {
            printf(" ");

           }   for (j = 1; j <= i; j++)
            {
                printf("*");
            }
        
        printf("\n");
    }
    return 0;
}