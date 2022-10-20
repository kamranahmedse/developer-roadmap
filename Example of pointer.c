#include<stdio.h>

int main()
{
int age=18;
int*ptr=&age;
int _age=*ptr;
printf("  age %d",age);
printf("\n *ptr %d",*ptr);
printf("\n _age %d",_age);

return 0;


}