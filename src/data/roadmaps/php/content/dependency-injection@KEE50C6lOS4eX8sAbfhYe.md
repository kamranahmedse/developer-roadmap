# Dependency Injection

Dependency injection is a design pattern used mainly for managing class dependencies. Here, instead of a class being responsible for creating its dependencies on its own, an injector (the "client") passes the requirements to the class (the "service"), centralizing control and encouraging code to follow the single responsibility principle. As a simple example, consider a situation where class B needs to utilize class A's methods. Instead of creating an object of class A within B, with dependency injection, we pass an instance of class A to B.

```php
class A {
    function display(){
        echo 'Hello, PHP dependency injection!';
    }
}

class B {
    private $a;

    public function __construct(A $classAInstance) {
        $this->a = $classAInstance;
    }

    public function callDisplayOwn() {
        $this->a->display();
    }
}

$instanceA = new A();
$instanceB = new B($instanceA);
$instanceB->callDisplayOwn();  // Outputs: "Hello, PHP dependency injection!"
```

Visit the following resources to learn more:

- [@article@Understand Dependency Injection in PHP](https://php-di.org/doc/understanding-di.html)