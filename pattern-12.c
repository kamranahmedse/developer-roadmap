#include <stdio.h>

int main()
{
    int i, j, s, n;
    printf("enter the value of n");
    scanf("%d", &n);
    for (i = 1; i <= n; i++)
    {
        for (s = 1; s <= n - i; s++)
        {
            printf(" ");
        }
        for (j = 65; j <= i+64; j++)
        {
            printf("%c", j);
            
        }
        printf("\n");
    }
   
    return 0;
}