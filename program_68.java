import java.util.Stack;
class collections
{
    public static void main(String[] args) 
    {
        Stack<String> name=new Stack<>(); 
        name.push("Yash");
        name.push("Naksh");
        name.push("YP");
        
        System.out.println(name);
        name.pop();     // it will remove the name that is add in last
        System.out.println(name);

    }
}