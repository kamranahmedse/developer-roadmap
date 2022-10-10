#include<stdio.h>
#include<stdlib.h>

int main()
{
    int n,m,k=1;
    printf("Enter the no. of rows:");
    scanf("%d",&n);

    for(int i=1;i<=n;i++)
    {
        for(int j=1;j<i;j++)
        {
            printf("%d ",k);
            k=k+1;
        }
    printf("\n");
    }
    return 0;
}
