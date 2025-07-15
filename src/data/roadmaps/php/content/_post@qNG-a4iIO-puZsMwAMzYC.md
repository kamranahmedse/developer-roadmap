# $_POST

`$_POST` is a superglobal variable in PHP that's used to collect form data submitted via HTTP POST method. Your PHP script can access this data through `$_POST`. Let's say you have a simple HTML form on your webpage. When the user submits this form, the entered data can be fetched using `$_POST`. Here's a brief example:

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
}
?>
```

In this code, `$_POST["name"]` fetches the value entered in the 'name' field of the form. Always be cautious when using `$_POST` as it may contain user input which is a common source of vulnerabilities. Always validate and sanitize data from `$_POST` before using it.

Visit the following resources to learn more:

- [@official@$_POST](https://www.php.net/manual/en/reserved.variables.post.php)