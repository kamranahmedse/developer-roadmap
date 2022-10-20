import java.io.*;
public class program_60 {
    
    public static void main(String[] args) 
    {
        try 
        {
          FileReader r=new FileReader("C:\\Users\\yashp\\OneDrive\\Desktop\\Java.txt");
          try
          {
            int i;
            while((i=r.read())!=-1) 
            {
                System.out.print((char)i);
            }
          }
          finally
          {
            r.close();
          } 
        }
        catch (IOException e)
        {
            System.out.println("exception sucssefully handled...!"); // TODO: handle exception
        }    
    }
}
