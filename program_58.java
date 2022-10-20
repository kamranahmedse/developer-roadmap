    // create a file
import java.io.*;
public class program_58 {
    
    public static void main(String[] args) 
    {
        File f= new File("C:\\Users\\yashp\\OneDrive\\Desktop\\Java.txt");
        try {
            if(f.createNewFile())
            {
                System.out.println("File sucessfully created....!");
            }
            else
            {
                System.out.println("File already exist....!");      
            }
        } catch (IOException i) {
            System.out.println("Exception handled....!");  // TODO: handle exception
        }   
    }
}