#include <stdio.h>
#include <math.h>

int main()
{
    int i=0;
    float ans,n;
    s:
    printf(" enter the number:- ");
    scanf("%f", &n);
    ans = sqrt(n);
    printf("square root of %f is %0.1f \n",n,ans);
    i++;
    if (i <= 5)
    {
        goto s;
    }
    else
    {
        printf("you reach max limit");
    }

    return 0;
}