# Variadic Functions

Variadic functions in PHP are functions that can accept any number of arguments. This gives you greater flexibility, as it allows for an undetermined number of arguments. You can create a variadic function by adding '...' before the function argument. Any number of arguments you provide when calling the function are treated as an array, which can be processed using common array functions. 

A simple code example: 

```php
function sum(...$numbers) {
    return array_sum($numbers);
}
echo sum(1, 2, 3, 4);
``` 

This prints "10". The function accepts any number of arguments and adds them together.

Visit the following resources to learn more:

- [@official@Variadic Functions](https://www.php.net/manual/en/functions.arguments.php#functions.variable-arg-list)
- [@article@Variable-length function arguments using spread token in PHP](https://www.amitmerchant.com/variable-length-function-arguments-using-spread-php/)
