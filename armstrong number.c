#include <stdio.h>

int main()
{
    int num, remainder, armstrongnumber, p = 0;
    printf("enter a number");
    scanf("%d", &num);
    while (num != 0)
    {
        remainder = num % 10;
        p += (remainder * remainder * remainder);
        num /= 10;
    }
    printf("%d", p);
    if (num = p)
    {
        printf(" it is an armstrong number ");
    }
    else
    {
        printf(" it is not an armstrong number");
    }
    return 0;
}