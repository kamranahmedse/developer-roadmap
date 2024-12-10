# Reading Files

Reading files is a common task in PHP and it provides a range of functions for this purpose. You can use the `fopen()` function with the 'r' mode to open a file for reading. The `fgets()` function lets you read a file line by line, while `fread()` reads a specified number of bytes. For reading the entire file in one go, use `file_get_contents()`. Remember to always close the file after you're done with `fclose()`. 

Here's a small example using `fgets()`:

```PHP
$file = fopen("example.txt", "r"); 
if ($file) {
    while (($line = fgets($file)) !== false) {
        echo $line;
    }
    fclose($file);
} else {
    echo 'Error opening file';
}
```
Check the [official PHP documentation](https://www.php.net/manual/en/book.filesystem.php) for more information on file system functions.