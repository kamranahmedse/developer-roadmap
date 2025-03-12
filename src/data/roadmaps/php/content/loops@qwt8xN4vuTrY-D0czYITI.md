# Loops

PHP incorporates the use of loops, which are a vital part of programming. They allow a block of code to be executed repeatedly based on a certain condition or until a specific condition is met. In PHP, there are four types of loops - 'while', 'do-while', 'for' and 'foreach'. The 'while' loop continues executing its nested code as long as the condition remains true. The 'do-while' loop executes a block of code at least once, and then either continues executing it or stops, based on the condition. The 'for' loop is often used when the number of iterations is known. The 'foreach' loop works with arrays and is used to loop through each key/value pair in an array. Here's a simple example of a 'for' loop in PHP:

```php
<?php
for ($i = 0; $i < 5; $i++) {
    echo $i;
}
?>
```

In this example, the loop will execute five times, with $i increasing by one each time, outputting the numbers from 0 to 4.

Visit the following resources to learn more:

- [@official@Loops](https://www.php.net/manual/en/language.control-structures.php)