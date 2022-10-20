#include<stdio.h>
#include<math.h>

int main()
{
    int n , m,c=0;
    printf("enter the nummber ");
    scanf("%d",& n);
    while(n!=0)
    {
        
        m=n%10;
        c=c+m;
        n=n/10;
        break;
    }
     while(n!=0)
    {
        n=n/10;
        m=n%10;
        c=c+m;
        
        break;
    }
    printf("sum of last two digit=%d",c);
return 0;
}