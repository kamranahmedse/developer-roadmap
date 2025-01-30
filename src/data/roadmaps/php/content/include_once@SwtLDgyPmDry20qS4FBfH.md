# include_once

The `include_once` statement is a part of PHP's file-handling toolkit, allowing developers to include a PHP file within another PHP file, but only for a one-time execution. This way, you can ensure that functions or objects defined in the included file are not duplicated leading to errors. It helps keep your code DRY (Don't Repeat Yourself) and clean. Here is a small example:

```php
include_once 'database.php';

$db = new Database();
```

In this simple code snippet, we include the `database.php` file once, giving us access to the `Database` class.

Visit the following resources to learn more:

- [@official@include_once](https://www.php.net/manual/en/function.include-once.php)