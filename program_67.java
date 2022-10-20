import java.util.LinkedList;
class collections
{
    public static void main(String[] args) 
    {
        LinkedList<String> name=new LinkedList<String>();       /* array list and linked list both are same difference is in arraylist it store in form of array and in linkedlist it stores in form wlinkedlist */
        name.add("Yash");
        name.add("Naksh");
        name.add("YP");
        
        System.out.println(name);
        name.addFirst("patel");
        name.addLast("raj");
        System.out.println(name);
        name.remove();   /* it will remove by default firt name of linked list */
        System.out.println(name);
        name.removeLast(); /* it will remove last name  */
        System.out.println(name);
    }
}