# Polymorphism

Polymorphism is a core concept in object-oriented programming that PHP supports. It provides a mechanism to use one interface for different underlying forms, enabling different objects to process differently based on their data type. In PHP, polymorphism can be achieved through inheritance and interfaces. For example, you may have a parent class 'Shape' and child classes 'Circle', 'Rectangle', etc. They all can have a method 'draw' but with different implementations. It's not limited to classes; you can also use polymorphism with interfaces by implementing different classes with the same interface where each class will have different code for the same method. 

Here's a small sample code demonstrating the concept:

```php
<?php
interface Shape {
  public function draw();
}

class Circle implements Shape {
  public function draw() {
    echo "Draw a circle";
  }
}

class Rectangle implements Shape {
  public function draw() {
    echo "Draw a rectangle";
  }
}

function drawShape(Shape $shape) {
  $shape->draw();
}

drawShape(new Circle());  
drawShape(new Rectangle()); 
?>
```

This creates a scalable way to add more shapes, as you only need to follow the 'Shape' interface.

Visit the following resources to learn more:

- [@opensource@Polymorphism](https://www.phptutorial.net/php-oop/php-polymorphism/)
