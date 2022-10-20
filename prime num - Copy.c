#include<stdio.h>
int main(){
 int i, num, n, count;
 printf("Enter the range: \n");
 scanf("%d", &n);
 printf("The prime numbers in between the range 1 to %d:",n);
 for(num = 1;num<=n;num++){
         count = 0;
         for(i=2;i<=num/2;i++){
             if(num%i==0){
                 count++;
                 break;
             }
        }
         if(count==0 && num!= 1)
             printf("%d ",num);
    }
    return 0;
}