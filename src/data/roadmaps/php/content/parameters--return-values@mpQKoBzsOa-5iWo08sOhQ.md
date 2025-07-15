# Parameters / Return Values

Parameters in PHP functions specify the input that the function expects to receive when it is called. They can be of various types like strings, integers, arrays, or even objects. PHP also supports default values for parameters and passing by reference. In PHP, the 'return' statement is often used to end the execution of a function and send back a value. Return values can be any data type. Here's a simple example:

```php
function addNumbers($num1, $num2) {
  $sum = $num1 + $num2;
  return $sum;
}

echo addNumbers(3, 4);  // Outputs: 7
```

In the above code, `$num1` and `$num2` are parameters, and the sum of these numbers is the return value.

Visit the following resources to learn more:

- [@official@Parameters / Return Values](https://www.php.net/manual/en/functions.arguments.php)