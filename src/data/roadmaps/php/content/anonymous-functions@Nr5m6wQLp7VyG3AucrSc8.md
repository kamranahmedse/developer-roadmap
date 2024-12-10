# Anonymous Functions

Anonymous functions in PHP, also known as closures, are functions that do not have a specified name. They are most frequently used as a value for callback parameters, but can be used in many other ways. When creating an anonymous function, you can also inherit variables from the parent scope. Here's a basic usage example:

```php
$greet = function($name)
{
    printf("Hello %s\r\n", $name);
};

$greet('World');
$greet('PHP');
```

In this example, we're creating an anonymous function and assigning it to the variable `$greet`. We then call this anonymous function using $greet with 'World' and 'PHP' as arguments.

Visit the following resources to learn more:

- [@official@PHP Documentation - Anonymous Functions](https://www.php.net/manual/en/functions.anonymous.php)