// super keyword // it is use for differentiate the the main class and ordinary class when both has same name
class A{
     
    int a=35; 
  void show()
    {
      System.out.println("hello "+a);
    

    System.out.println("enjoy your life");
    }
}
class B extends A
{
    int a=20; 
    void show()
    {
      super.show();
      System.out.println("be happy"); 
      System.out.println(a);
      System.out.println(super.a);
    }
}

class test {
    public static void main(String[] args) 
    {
     B r=new B();
     r.show();   
    }
}
