# Configuration Tuning

For performance optimization in PHP, configuration tuning is a crucial step. You can manipulate several settings in your php.ini file to enhance your PHP application's performance. For instance, `memory_limit` is a key parameter that specifies the maximum amount of memory a script can consume. Optimizing this setting will prevent the PHP scripts from eating up all server resources. Similarly, adjusting the `max_execution_time` limits the time a script runs. Just ensure careful configuration since restrictive settings could lead to issues. Here's a simple example of how you might modify these parameters:

```php
// Updating memory_limit
ini_set('memory_limit','256M');

// Updating max_execution_time
ini_set('max_execution_time', '300');
```

Visit the following resources to learn more:

- [@official@Official Documentation - PHP.ini](https://www.php.net/manual/en/ini.core.php)