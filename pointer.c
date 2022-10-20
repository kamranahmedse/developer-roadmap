#include <stdio.h>
#include<math.h>

int main() {
    int a, b,sum,sub;
    int *pb,*pa;
    
    scanf("%d %d", &a, &b);
    pa=&a, 
    pb=&b;
    
   
    sum=*pa+*pb;
    sub=*pa-*pb;
    printf("%d",sum);
    printf("\n%d",sub);
    return 0;
}
