#include<stdio.h>
 
int main()
{
    int n,low;
    scanf("%d",&n);
    low=-n; 
    while(low<=n)
    {
        printf("%d",low);
        low++;
    }
    
}