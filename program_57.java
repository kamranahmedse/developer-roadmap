                                    // program for exception handling
class program_57
{
    public static void main(String[] args) {
        System.out.println(" main method started ");
         try{
        int a=10,b=0,c;
        c=a/b;  //c=10/0
         
        System.out.println(c);
    }
   catch (ArithmeticException e) // arithmetic exception is a class which handles only arithmetic exception
   {
    System.out.println("cannot divide by zero");// TODO: handle exception
    }
        System.out.println("main methoJd ended ");
    }
}