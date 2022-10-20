#include<stdio.h>

int main()
{
int n;
printf("enter a number ");
scanf("%d",&n);
 int low=-n;
 while(low<=n)
{
    printf("%d",low);
    low++;

}
return 0;
}