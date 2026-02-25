# Default / Optional Params

In PHP, you can assign default values to your function parameters. These are called default or optional parameters. This is exceptionally useful when you want to make the function argument optional so if a value is not provided when the function is called, then the default value is used instead. Here's a simple code example:

    function greet($name = "guest") {
      echo "Hello, $name!";
    }
    
    greet(); // Outputs: Hello, guest!
    greet("John"); // Outputs: Hello, John!

Visit the following resources to learn more:

- [@official@Default Parameters](https://www.php.net/manual/en/functions.arguments.php#functions.arguments.default)