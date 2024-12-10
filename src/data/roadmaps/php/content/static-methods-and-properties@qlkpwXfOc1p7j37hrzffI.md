# Static Methods and Properties

Static methods and properties in PHP belong to the class rather than an instance of the class. This means they can be accessed without creating an object of the class. A static method is declared with the static keyword and can be invoked directly using the class name followed by the scope resolution operator. Similarly, a static property is also defined with the static keyword, but cannot be accessed directly, even from within the class methods - they must be accessed through static methods. Here's a simple example: 

```php
class MyClass {
    static $myStaticProperty = "Hello, world";

    static function myStaticMethod() { 
        return self::$myStaticProperty; 
    }
}

echo MyClass::myStaticMethod(); 
```

In this example, we're directly accessing `myStaticMethod` from `MyClass` without an instantiation. For more detail, check out the PHP documentation [here](https://www.php.net/manual/en/language.oop5.static.php).