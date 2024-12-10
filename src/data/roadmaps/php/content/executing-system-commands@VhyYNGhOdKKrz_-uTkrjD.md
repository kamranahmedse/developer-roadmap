# Executing System Commands

PHP provides developers with the flexibility to invoke system commands directly from PHP scripts. This can be achieved with functions like `exec()`, `system()`, or `passthru()`, which allow your PHP script to execute system-level instructions and interact with the underlying server. This can be useful in several scenarios - for automating tasks, orchestrating system activities, or even for pulling out system information. However, it's important to use these functions with caution due to the security risks of executing system commands. Here's a simple example of using the exec() function:

```php
<?php
// Outputs all lines
exec('ls', $output);
foreach($output as $out){
    echo $out, PHP_EOL;
}
?>
```

The above script runs the 'ls' command that lists all files and directories in the current folder. For more details, check out the official PHP documentation [here](https://www.php.net/manual/en/ref.exec.php).