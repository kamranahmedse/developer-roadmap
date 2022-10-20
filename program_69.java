import java.util.ArrayDeque;
class collections
{
    public static void main(String[] args) 
    {
        ArrayDeque<String> name=new ArrayDeque<>();  // FIFO
        name.push("Yash");
        name.push("Naksh");
        name.push("YP");
        System.out.println(name);
        name.pop();  // it will remove name which was added first   
        System.out.println(name);
    }
} // last program of java