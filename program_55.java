        //method overloading             by this method overloading we can do compile time polymorphism
class poly
{
    void add()
    {
        int a=10,b=20,c; 
        c=a+b;
        System.out.println(c);
    }
    void add(int x ,int y)
    {
        int c;                                                             /* in this we have 3 method of same name add but we have 
                                                                    different parameters this is known as polymorphism  */
        c=x+y; 
        System.out.println(c);
    }
    void add(int x,double y)
    {
        double c;
        c=x+y;
        System.out.println(c);  
    }
    public static void main(String[] args) 
    {
        poly r=new poly();
        r.add(); r.add(30,70); r.add(45,55.55);        
    }
}