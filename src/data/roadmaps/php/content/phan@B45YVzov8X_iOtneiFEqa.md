# Phan

Phan is a static analysis tool specially made for PHP language, greatly useful in catching common issues in the code before execution. It can analyze the syntax and behaviors in PHP code, detecting problems such as undeclared variables, type inconsistencies, uncaught exceptions, and more. Interestingly, Phan has a particular strength — it understands the relationships among PHP's different features, making the tool effective in finding subtle, complicated bugs. To use it, simply install it using composer and run the command 'phan' in your project directory. Want to learn more? The official PHP documentation can support you: [PHP Documentation](https://www.php.net/manual/en/).
```php
<?php
// Phan sample usage

require 'vendor/autoload.php';    // Autoload files using Composer autoload

use Phan\Phan;
use Phan\CLI;

$code = "<?php function add(int $a, int $b): int { return $a + $b; } echo add('hello', 'world');"; // code with a type error

Phan::analyzeFile('test.php', $code);
```
Above is a basic sample of using Phan. It checks for a type error in a PHP function.