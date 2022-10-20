#include <stdio.h>
#include <math.h>
int main()
{
    int n, count = 0, i, d = 0, c = 0;

    for (i = 1; i <= 10; i++)
    {
        printf("\nenter the number");
        scanf("%d", &n);
    
  
        if (n% 2 == 0)
        {
            printf("\n%d is a even number", n);
            d=d+1;
        }
        else
        {
            printf("\n%d is a odd number",n );
            c=c+1;
        }
    }
    printf("\ncounteven=%d", d);
    printf("\ncountodd=%d", c);

    return 0;
}