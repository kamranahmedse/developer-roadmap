# Process Control

Process Control, a crucial aspect of PHP system interactions, pertains to the ability to manage child processes within larger PHP scripts. Through the Process Control Extensions, PHP can create, monitor and control these child processes efficiently. These functions help develop robust client-server systems by managing and bringing multi-threading capabilities to single-threaded PHP scripts. For instance, when creating a new child process using pcntl_fork() function, the return value in the parent process is the PID of the newly created child process whereas, in the child process, '0' is returned. Remember, this feature isn't enabled by default in PHP. 

Here's a short PHP code demonstrating Process Control:

```php
<?php 
$pid = pcntl_fork();
if ($pid == -1) {
     die('could not fork');
} else if ($pid) {
     // we are the parent
     pcntl_wait($status); // Protect against Zombie children
} else {
     // we are the child
}
?>
```

Visit the following resources to learn more:

- [@official@Process Control](https://www.php.net/manual/en/ref.pcntl.php)
