#include <stdio.h>
#include <math.h>

int main()
{
    int no, rem, rev = 0;
    printf("enter a number");
    scanf("%d", &no);
label:
    rem = no % 10;
    rev = rev * 10 + rem;
    no = no / 10;
    if (no != 0)
    {
        goto label;
    }
    printf("%d", rev);
    return 0;
}