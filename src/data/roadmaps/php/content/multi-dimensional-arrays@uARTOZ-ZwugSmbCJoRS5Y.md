# Multi-dimensional Arrays

Multi-dimensional arrays in PHP are a type of array that contains one or more arrays. Essentially, it's an array of arrays. This allows you to store data in a structured manner, much like a table or a matrix. The fundamental idea is that each array value can, in turn, be another array. For instance, you can store information about various users, where each user (a primary array element) contains several details about them (in a secondary array like email, username etc.). Here's an example: 
```    
$users = array(
       array("John", "john@example.com", "john123"),
       array("Jane", "jane@example.com", "jane123"),
       array("Doe", "doe@example.com", "doe123")
);
```
You can access elements of this array just like you would with a normal array but with an extra index denoting the 'depth'. More about this can be found in the [PHP documentation](https://www.php.net/manual/en/language.types.array.php).
