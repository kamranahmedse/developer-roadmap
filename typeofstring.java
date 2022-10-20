import javax.lang.model.util.ElementScanner14;

public class typeofstring {

    public static void main(String[] args) {
        String str="yash patel";
        String str2= new String("yash patel");
        if(str==str2)// it will check only variable name if variable name is same then it is equal 
        {
            System.out.println("both string is equal");
        }
        else
        {
            System.out.println("both string is not equal");
        }

        System.out.println("-----------------------------------------");

        if(str.equals(str2))// it will check only value of string if both name is same in both string then it is equal
        {
            System.out.println("both string is equal");
        }
        else
        {
            System.out.println("both string is not equal");
        }
    }
    
}
