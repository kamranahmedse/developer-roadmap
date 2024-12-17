# Inheritance

Inheritance, a fundamental concept in object-oriented programming (OOP), is a feature that PHP supports. It lets us create classes which are extensions of other classes, inheriting their methods and properties. This concept allows the creation of more flexible and maintainable code, as it promotes code reuse. For instance, consider we have a 'Vehicle' class and we want to create a 'Car' class. Since cars are a type of vehicle, it would make sense for our 'Car' class to inherit from the 'Vehicle' class.

```php
class Vehicle {
  public $color;
  function drive() {
    echo "Driving...";
  }
}

class Car extends Vehicle {
  function horn() {
    echo "Beeping...";
  }
}

$myCar = new Car();
$myCar->drive(); // Inherits drive method from Vehicle
$myCar->horn(); // Unique to Car
```

In the above example, the 'Car' class inherits the drive method from the 'Vehicle' class but also has an additional method, horn. This is an illustration of how inheritance in PHP can help to organize your code efficiently and intuitively.

Visit the following resources to learn more:

- [@official@Inheritance](https://www.php.net/manual/en/keyword.extends.php)