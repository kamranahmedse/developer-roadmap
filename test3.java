// super keyword with constructor  // 
class A{

    A(int a) 
    {
    System.out.println("hello "+a);
    System.out.println("enjoy your life");
    }
}
class B extends A
{
    int a=20; 
    B()
    { super(100);              // in this line we have to write super keyword for parameterised constructor compulsory
      System.out.println("be happy"); 
      System.out.println(a);
    }
}

class test3 {
    public static void main(String[] args) 
    {
     B r=new B();
      
    }
}

