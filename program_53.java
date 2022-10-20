            // multiple inheritance
interface Aa
{
    void show(); // it is by default public and abstract        you can use abstract before void it is not compulsory 
}
interface Bb
{
    void disp();    // public + abstract
}
class multiple implements Aa,Bb
{
    public static void main(String[] args) 
    {
     multiple m=new multiple();
    m.show();  m.disp();
    }

   public void show()
    {
        System.out.println("interface A  ");
    }
    public void disp()
    {
        System.out.println("interface B ");
    }

    
}