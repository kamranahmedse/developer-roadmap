# var_dump

Var_dump is a built-in PHP function that's incredibly handy for debugging as it outputs the data type and value of a given variable. This includes array elements and object properties, if given such types. If you're wrangling with your PHP code and finding your variables aren't behaving as you expect, using var_dump can quickly show you what you're working with. Check out a simple usage example below:

```php
$myVar = array( "Hello", "World!");
var_dump($myVar);
```

This will output the size of array and details of each element in the array. You can find more examples and usage scenarios on the [PHP official documentation](https://www.php.net/manual/en/function.var-dump.php).
