# Constructor / Destructor

Constructor and Destructor methods are fundamental components of Object-Oriented Programming (OOP) in PHP. A constructor is a special type of method that automatically runs upon creating an object, often used to set property values or default behaviors. On the other hand, a destructor is a method that is automatically invoked when an object is due to be destroyed, perfect for cleanup activities. Here is a basic example:

```php
class TestClass {
  public $value;

  // Constructor Method
  public function __construct($val) {
    $this->value = $val;
  }

  // Destructor Method
  public function __destruct() {
    echo "Object is being destroyed.";
  }
}

$obj = new TestClass("Hello World");
echo $obj->value; 
// Displays: Hello World
// And when the script ends, "Object is being destroyed."
```

Visit [PHP Constructors and Destructors](https://www.php.net/manual/en/language.oop5.decon.php) for a more detailed look at these vital concepts.