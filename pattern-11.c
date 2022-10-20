#include <stdio.h>

int main()
{
    int i, s, j, n;
    scanf("%d", &n);
    for (i = 1; i <= n; i++)
    {
        for (s = 1; s <=2*i-1; s++)
        {
            printf(" ");
        }
           
        for (j = 1; j <=i; j++)
            {
                printf("*");
            } 
        
        printf("\n");
    }
    return 0;
}