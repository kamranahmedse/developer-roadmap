# JSON Processing

JSON Processing in PHP refers to the handling, reading, and manipulation of JSON formatted data. JSON, or JavaScript Object Notation, is a versatile data format used worldwide due to its easy readability and robustness. PHP natively supports JSON and includes built-in functions like `json_encode()` and `json_decode()`. The `json_encode()` function returns a JSON representation of a value, particularly useful when you need to pass arrays or objects to a script. On the other hand, `json_decode()` is used to extract data from a JSON file or a JSON-encoded string, converting it into a PHP variable. Here's a quick example: 

```php
// Create an array
$data = array('a' => 1, 'b' => 2, 'c' => 3);

// Encode the array into a JSON string
$json = json_encode($data);
echo $json;

// Output: {"a":1,"b":2,"c":3}

// Decode the JSON string back into an array
$decoded = json_decode($json, true);
print_r($decoded);

// Output: Array ( [a] => 1 [b] => 2 [c] => 3 )
```

Visit the following resources to learn more:

- [@official@JSON Manual](https://www.php.net/manual/en/book.json.php)