import java.util.Scanner;

public class ifelseif {

    public static void main(String[] args)
    {
        int num1=20;
        int num2=90;
        int num3=59;
        if(num1>num2)
        {
            if(num1>num3)
            {
                System.out.print("number 1 is greater "+num1);
            }
            else
            {
                System.out.print("number 3 is greater "+num3);
            }
        }
        else
        {
            if(num2>num3)
            {
                System.out.print("number 2 is greater "+num2);
            }
            else
            {
                System.out.print("number 3 is greater "+num3);
            }
        }

    }