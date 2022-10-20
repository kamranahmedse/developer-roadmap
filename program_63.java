                    /* User defined Package */
                   /* protected package */
                   package yash;   
public class Q
{
 protected void show() 
    {
        System.out.println("Hi...!");
    }
}  
class S  extends Q            /*if we can remove class S then also program will  */
 {       
    public static void main(String[] args) 
     {
     S r=new S();
     r.show();
    }
     }
                   
                   