#include <stdio.h>

int main()

{

    int i, j;

    for (i = 5; i >= 1; i--)
    {
        for (j = 11; j <= 2*i - 1; j++)
        {
            printf("*");
        }
    }

    return 0;
}
