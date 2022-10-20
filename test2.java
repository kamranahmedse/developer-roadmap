// super keyword with constructor  // 
class A{
     
    int a=35; 
    A() 
    {
      System.out.println("hello "+a);
    

    System.out.println("enjoy your life");
    }
}
class B extends A
{
    int a=20; 
    B()
    {               // in this line if we don't write super();[super keyword ] than also by default compiler will include it
      System.out.println("be happy"); 
      System.out.println(a);
      System.out.println(super.a);
    }
}

class test2 {
    public static void main(String[] args) 
    {
     B r=new B();
      
    }
}

