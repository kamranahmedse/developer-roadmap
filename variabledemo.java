public class variabledemo {
    int a = 10; // instance variable
    static double b = 20.5; // static variable

    public static void main(String[] args)
     {

        boolean c = true; // local variable
    
        variabledemo s= new variabledemo();
        System.out.println(s.a);
        System.out.println(b);
        System.out.println(c);

        System.out.println(s.a + " " + b + " " + c);//other method for display- data + contactidation
    }
    
}
