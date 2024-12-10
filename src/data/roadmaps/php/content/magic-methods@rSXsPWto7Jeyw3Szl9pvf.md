# Magic methods

PHP Magic Methods, often considered the hooks of the language, provide developers a way to change how objects will respond to particular language constructs. Magic methods are special functions that start with "__" such as __construct(), __destruct(), __call(), __get(), __set() and more. They enable us to perform certain tasks automatically when specific actions occur. For example, __construct() executes when an object is created while __destruct() triggers when an object is no longer needed. Let's see the __construct magic method in action:

```php
class Car {
    public $color;
    public function __construct($color) {
        $this->color = $color;
    }
}
$blueCar = new Car("Blue"); // This will call the __construct() method.
echo $blueCar->color;  // Outputs "Blue".
```

To delve deeper into magic methods and their various usages, you can check the official PHP documentation. Here's the link: [PHP Magic Methods](https://www.php.net/manual/en/language.oop5.magic.php)