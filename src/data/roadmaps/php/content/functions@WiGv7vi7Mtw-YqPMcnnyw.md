# Functions

Functions in PHP are self-contained blocks of code that carry out specific tasks and can be reused throughout your application. A function is defined with the word "function" followed by a name, and it should return a value using the "return" statement. To use a function, you simply need to call it by its name. You can also pass parameters to functions to influence how they work. Here's a simple function:

```php
function greet($name) {
    return "Hello, " . $name;
}

echo greet("John"); // Outputs: Hello, John
```

In the code above, "greet" is a function that takes one parameter "name". It concatenates "Hello, " with the name and returns the result.

Visit the following resources to learn more:

- [@official@Functions](https://www.php.net/manual/en/language.functions.php)