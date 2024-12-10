# Named Arguments

Named arguments in PHP, introduced with PHP 8.0, allow you to specify the values of required parameters by their names, instead of their position in the function call, thus making your code more readable, reducing mistakes, and allowing for unimportant arguments to be skipped. Here's an array_fill() function using named arguments:

```php
<?php
$a = array_fill(start_index: 0, num: 100, value: 50);
```

In this code snippet, the parameters are passed by their names ('start_index', 'num', 'value'), not by their order in the function definition. You can learn more about named arguments in the [PHP Documentation](https://www.php.net/manual/en/functions.arguments.php#functions.named-arguments).