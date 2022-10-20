#include <stdio.h>

int main()
{
    int nm1, nm2, nm3;
    printf("enter the value of number 1-");
    scanf("%d", &nm1);
    printf("enter the value of number 2-");
    scanf("%d", &nm2);
    printf("enter the value of number 3-");
    scanf("%d", &nm3);
    if (nm1 > nm2 && nm1 > nm3)
    {
        printf("the number 1 is maximum number");
    }
    else if (nm2 > nm1 && nm2 > nm3)
    {
        printf("the number 2 is maximum number");
    }
    else
    {
        printf("the number 3 is maximum number");
    }
    return 0;
}