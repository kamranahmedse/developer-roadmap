class shape 
{
    void draw ()
    {
        System.out.println("can't say shape type");
    }
}

class square extends shape
{ 
  
    void draw()
    {
        System.out.println("Square shape");
    }
}

class program_56()
{
    public static void main(String[] args) 
    {
        shape r=new shape(); 
        r.draw();   
    }
}