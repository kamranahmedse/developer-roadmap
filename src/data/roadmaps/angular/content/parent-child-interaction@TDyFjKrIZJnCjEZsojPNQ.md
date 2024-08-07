# Parent-Child Interaction
In angular parent-child communication is commonly used to share data between two components.

Here is the structure it follows:
```
<parent-component>
 <child-component></child-component>
</parent-component>
```
### Sending data from Parent to Child
@Input — we use this decorator in a child component or directive to signify that the property can receive its value from its parent component. 
```
Ex:
<child-component [message]="Hello parent message"/>
```
the child component  will receive the message from parent component.


###  Sending data from the Child to the Parent

@Output — marks a property in a child component as a doorway through which data can travel from the child to the parent and it notifies the parent that an event has been raised.

to send data from child to parent we can use emit functionality like we need to bind a function from parent to child component 
```
Ex:
<child-component (childEvent)="receiveMessage($event)"/>
```
when we use this function name on any click functionality in child component it will trigger the parent component receiveMessage function
 
Visit the following resources to learn more 

[send data from parent-child and child-parent](https://v17.angular.io/guide/inputs-outputs).

[parent-child communication - Medium](https://jaspritk.medium.com/parent-child-communication-in-angular-888373e0b69e)

