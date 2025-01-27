# Autoloading

Autoloading is a convenient feature in PHP that allows for automated loading of classes or files when they are needed. For example, if you have a class that is not yet included or required in the script, and you're instantiating that class, PHP would automatically include that class file for you, given that it complies with the standard PHP autoloading conventions. This feature cuts down the need to manually include or require files and makes your code cleaner and more efficient to manage. Here's a simple example:

```php
spl_autoload_register(function ($class_name) {
    include $class_name . '.php';
});

$obj = new MyClass();
```

In this example, PHP will automatically load the MyClass.php file when the MyClass is instantiated.

Visit the following resources to learn more:

- [@official@Autoloading](https://www.php.net/manual/en/language.oop5.autoload.php)