import java.io.*;
public class program_59 {
    
    public static void main(String[] args) 
    {
        try 
        {
        FileWriter f=new FileWriter("C:\\Users\\yashp\\OneDrive\\Desktop\\Java.txt");
            try 
            {
                f.write("java programming language is the best language");
            }
            finally 
            {
              f.close();  // TODO: handle exception
            }
            System.out.println("Sucessfully data writen in file...!");
        } 
        catch (IOException i) 
        {
           System.out.println(i); // TODO: handle exception
        }    
    }
}
