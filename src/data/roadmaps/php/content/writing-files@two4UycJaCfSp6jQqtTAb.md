# Writing Files

Writing files plays a crucial part in PHP, allowing you to store data and modify it later. This process involves opening the file, writing the desired data, and then closing it. Writing can be done using different functions, but `fwrite()` is the most commonly used one. It requires two arguments the file pointer and the string of data to be written. Here's a brief snippet of code for instance:

```php
$file = 'data.txt';
$current = file_get_contents($file);
$current .= "New Data\n";
file_put_contents($file, $current);
```

In this code, `file_get_contents()` is used to get the current data, then new data is appended, and `file_put_contents()` is used to write back to the file.

Visit the following resources to learn more:

- [@official@Writing Files](https://www.php.net/manual/en/function.fwrite.php)
