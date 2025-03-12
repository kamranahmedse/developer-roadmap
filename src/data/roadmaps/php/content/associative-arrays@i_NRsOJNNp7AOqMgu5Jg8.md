# Associative Arrays

Associative arrays in PHP are a type of array that uses named keys instead of numeric ones. This provides a more human-readable way to store data where each value can be accessed by its corresponding string key. An example of an associative array could be storing names as keys and their corresponding ages as values. Here's a brief example:

```php
$ages = array(
   "Peter" => 35,
   "John" => 42,
   "Mary" => 27
);
```

In this case, to find out John's age, you would simply use `echo $ages['John']` where 'John' is the key. Associative arrays are also easy to loop through using the `foreach` construct.

Visit the following resources to learn more:

- [@official@PHP Documentation - Associative Arrays](https://www.php.net/manual/en/language.types.array.php)