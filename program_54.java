        // hierarchical inheritance
class cc
{
    void input()
    {
    System.out.println("Enter your name");
    }
}
class dd extends cc
{
    void show()
    {
        System.out.println("My name is Yash");
    }
}
class ee extends cc
{   
    void disp()
    {
    System.out.println("My name is Naksh");
    }
}
class demo
{
    public static void main(String[] args) {
        dd r=new dd();
        ee r2=new ee();
      r.input();  r.show();
      r2.input();  r2.disp();
        
    }
}
