# Properties and Methods

Properties and Methods are fundamental components of Object-Oriented Programming (OOP) in PHP. Properties are just like variables; they hold information that an object will need to use. Methods, on the other hand, are similar to functions; they perform an action on an object's properties. In PHP, properties are declared using visibility keywords (public, protected, or private) followed by a regular variable declaration, while methods are declared like functions but inside a class. Here is a simple example: 

```
class Car {
  public $color; // Property

  // Method
  public function setColor($color) {
    $this->color = $color;
  }
}
```
In this example, `$color` is a property and `setColor()` is a method. Learn more through [PHP documentation](https://www.php.net/manual/en/language.oop5.properties.php).