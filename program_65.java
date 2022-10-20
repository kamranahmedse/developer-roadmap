                /*by extending thread class */
class v extends Thread
{
    @override
    public void run()
    {
        for(int i=0;i<=5;i++);
        {
            System.out.println("Yash");
            // Thread.sleep(1000); /* for delay the thread for 1 second */
        }
    }
}
class u 
{

    public static void main(String[] args) 
    {
        
        v t=new v();
        t.start();
        for(int i=0;i<=5;i++)
        {
            System.out.println("Naksh");
            // Thread.sleep(1000);
        }
    }
}