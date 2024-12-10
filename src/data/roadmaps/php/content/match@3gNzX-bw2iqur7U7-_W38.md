# match

Match expressions are an integral feature of PHP, introduced in PHP 8.0 as an alternative to the switch statement. Compared to the switch statement, match expressions are safer since they don't require break statements and are more concise. The match expression can be an excellent tool for pattern matching. Here's an example:

```php
$message = match ($statusCode) {
  200, 300 => 'OK',
  400 => 'error',
  default => 'unknown status code',
};
```
In this code, based on the value of `$statusCode`, the `match` expression assigns a specific text to the `$message`. If `$statusCode` is not 200, 300, or 400, the `default` case applies. After running the code, the `$message` variable contains the result of the `match` expression. You can learn more about `match` expressions in PHP documentation: https://www.php.net/manual/en/control-structures.match.php.