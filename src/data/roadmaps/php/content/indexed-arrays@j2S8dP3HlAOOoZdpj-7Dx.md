# Indexed Arrays

Indexed arrays in PHP store values that are accessed through numerical indexes, which start at 0 by default. This might be particularly useful when you have a list of items in a specific order. For example, you might use an indexed array to represent a list of your favorite books, where each book is numbered starting from 0. Each individual item in the array, book in this case, can be accessed by their specific index. You can use the array() function or the short array syntax [] to declare an indexed array.

Example:
```php
$books = array("The Great Gatsby", "Moby Dick", "To Kill a Mockingbird");
echo $books[0]; //Outputs "The Great Gatsby"
```
You can find more on this in PHP's official documentation [here](https://www.php.net/manual/en/language.types.array.php).