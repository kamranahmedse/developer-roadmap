public class relational_operator {

    public static void main(String[] args) {
        
        int a=20,b=40,c=6,r;
        System.out.println("relational operator");

        System.out.println(a==b);
        System.out.println(a!=b);
        System.out.println(a>b);
        System.out.println(a<b);
        System.out.println(a>=b);
        System.out.println(a<=b);

        System.out.println("logical operator");
        System.out.println("        ");
        System.out.println(a==b && a!=b);
        System.out.println(a==b || a!=b);
        System.out.println(!(a>b)); // it will reverse the value 
        System.out.println("    ");
        System.out.println("ternary operator");

       r=(a>b)?(a>c?a:c):(b>c?b:c);
       System.out.println(r);
    }
    
}
