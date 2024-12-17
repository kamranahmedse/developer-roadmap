# Variables and Scope

Variables are a central part of PHP, allowing you to store data that can be used later in your scripts. Their values can be of various types including strings, integers, arrays, and objects. PHP has both local and global scope when it comes to variables. Local scope refers to variables that are only accessible within the function they are defined, while global scope means a variable is accessible to any part of the script. However, to use a global variable inside a function, you need to declare it as global. Here's a brief example: 

```php
$x = 10; //global variable
function test() {
    global $x; // accessing the global variable
    echo $x;
}
test(); //prints 10
```

Visit the following resources to learn more:

- [@official@Variables and Scope](https://www.php.net/manual/en/language.variables.scope.php)
