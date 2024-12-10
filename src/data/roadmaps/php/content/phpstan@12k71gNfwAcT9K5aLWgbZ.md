# PHPStan

PHPStan is a static analysis tool for PHP that focuses on discovering bugs in your code. As opposed to dynamic analysis which works while your program is running, static analysis examines your code without executing it. PHPStan can catch an entire class of bugs even before you write tests for the code, thus making it a valuable tool in PHP development. For example, PHPStan can prevent issues like accessing an undefined array key or calling a method that doesn't exist. 

Here's a basic example of how you can use PHPStan:

```
// install PHPStan using composer
$ composer require --dev phpstan/phpstan

// analyse your code
$ vendor/bin/phpstan analyse src
```
For more advanced configuration and usage options, refer to the [PHPStan documentation](https://phpstan.org/user-guide/getting-started).