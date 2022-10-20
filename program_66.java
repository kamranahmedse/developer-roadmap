import java.util.ArrayList;
class collections
{
    public static void main(String[] args) 
    {
        ArrayList<String> name=new ArrayList<String>();
        name.add("Yash");
        name.add("Naksh");
        name.add("YP");
        
        System.out.println(name);
        name.add(0 ,"patel");   /* it is for add name at any place in array */
        System.out.println(name);
        name.remove(0);
        System.out.println(name);/* it is for remove name for array  */
        name.clear();   /* it is for clear full array list */
        System.out.println(name);
    }
}