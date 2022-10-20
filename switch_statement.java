import java.util.Scanner;

 public class switch_statement {

    public static void main(String[] args) 
    {
        int a,b,ch,c;
        System.out.println("enter any two numbers");
        Scanner s=new Scanner(System.in);
        a=s.nextInt();
        b=s.nextInt();
        System.out.println("enter your choice");
        ch=s.nextInt();
        switch(ch)
        {
            case 1: 
            c=a+b;
            System.out.print("addition "+c);
            break;
            case 2: 
            c=a-b;
            System.out.print("subtraction "+c);
            break;
            case 3: 
            c=a*b;
            System.out.print("multiplication "+c);
            break;
            case 4: 
            c=a/b;
            System.out.print("division "+c);
            break;
            case 5: 
            c=a+b;
            System.out.print("remainder "+c);
            break;
            default:
            System.out.print("invalid choice");
        }
        
    }

}
