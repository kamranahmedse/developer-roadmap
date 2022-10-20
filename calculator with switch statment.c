#include <stdio.h>
#include <math.h>

int main()
{
    int a, b, c;
    printf("enter the value of a");
    scanf("%d", &a);
    printf("enter the value of b");
    scanf("%d", &b);
    printf("enter the choice");
    scanf("%d", &c);
    switch (c)
    {
    case 1:
        printf("addition=%d", a + b);

        break;
    case 2:
        printf("subtraction=%d", a - b);

        break;
    case 3:
        printf("multiplication=%d", a * b);

        break;
    case 4:
        printf("division=%d", a / b);

        break;
    case 5:
        printf("module=%d", a % b);

        break;

    default:
        printf("invalid operation");
        break;
    }

    return 0;
}