#include <stdio.h>
#include <math.h>
int main()
{

  double interval, i;
  printf("Enter the interval (eg. 0.1):\n");
  scanf("%lf", &interval);
  for (i=0 ;i <= 1; i += interval)
   {
    printf("sin(%.1f)=%.3f\n", i, sin(i));
    printf("cos(%.1f)=%.3f\n", i, cos(i));

  }
  return 0;
}