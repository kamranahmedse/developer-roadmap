#include <stdio.h>

int main()
{
    int i, j;

    for (i = 1; i <= 7; i++)
    {

        for (j = 1; j <= i; j++)
        {
            if (j == 1 || i == j || i == 7)
            {
                printf("*");
            }
            else

                printf(" ");
        }

        printf("\n");
    }
    return 0;
}