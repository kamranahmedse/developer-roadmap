import java.util.Scanner;

public class while_loop {

    public static void main(String[] args) 
    {
        int num;
        System.out.print("enter any number");
        Scanner s= new Scanner(System.in);

        num=s.nextInt();
            while(num>=0)
            {
                if(num%2!=0)
                {
                    System.out.println("odd number");
                    break;

                }
                else
                {
                    System.out.println("even number");
                    break;
                }                
            }

        
    }
    
}
