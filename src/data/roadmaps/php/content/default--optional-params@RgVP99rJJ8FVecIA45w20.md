# Default / Optional Params

In PHP, you can assign default values to your function parameters. These are called default or optional parameters. This is exceptionally useful when you want to make the function argument optional so if a value is not provided when the function is called, then the default value is used instead. Here's a simple code example:

```php
function greet($name = "guest") {
  echo "Hello, $name!";
}

greet(); // Outputs: Hello, guest!
greet("John"); // Outputs: Hello, John!
```

In this example, the `greet` function has a default value of "guest" for the `$name` parameter. So, if no argument is given while calling `greet`, it defaults to greet a "guest". If an argument is provided, like `John`, it overrides the default value. Follow this [link](https://www.php.net/manual/en/functions.arguments.php#functions.arguments.default) for the PHP documentation on function arguments.