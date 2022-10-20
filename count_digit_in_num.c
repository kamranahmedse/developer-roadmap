#include <stdio.h>
#include <math.h>

int main()
{
    int n,m, c = 0;
    printf("enter the number ");
    scanf("%d", &n);
    
    while (n!= 0)
    {

     
        m= n % 10;

        c = c + m;
        n=n/10;
        
        
    }
    printf("sum=%d", c);
}