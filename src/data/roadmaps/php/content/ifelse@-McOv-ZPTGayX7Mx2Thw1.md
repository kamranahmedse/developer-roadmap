# if/else

In PHP, the if/else conditional statements are fundamental components that control the flow of the program based on specific conditions. When the 'if' condition is true, a block of code will execute. If that condition is not met (or false), the program proceeds to the 'else' statement (if provided), executing its block of code. This allows you to handle different situations dynamically. A simple example of this concept in action would be:

```php
$number = 10;
if ($number > 5) {
    echo "The number is greater than 5";
} else {
    echo "The number is not greater than 5";
}
```

In this example, the output will be "The number is greater than 5" because the condition evaluated to true. You can find more information on the if/else conditional statements in the [PHP documentation](https://www.php.net/manual/en/control-structures.elseif.php).