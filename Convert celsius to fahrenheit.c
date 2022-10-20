#include<stdio.h>

int main()
{
float fare,cels;
printf("Enter the temperature in fahrenheit");
scanf("fahrenheit=%f",&fare);
cels=(fare - 32)*0.5;
printf("the temperature in celsius is %f",cels);

return 0;
}
