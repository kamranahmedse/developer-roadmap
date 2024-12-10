# Sanitization Techniques

Sanitization Techniques is a vital part of PHP security basics, which ensures that the user-provided data is safe to be used within your script. It can prevent harmful data from being inserted into the database or being used in other ways that could potentially be dangerous to your application. It includes functions which can strip off unwanted characters from the data. For instance, the `filter_var()` function in PHP can be applied to sanitize text. 

```php 
$dirty_data = "<p>We love PHP!</p><script>alert('Virus!')</script>";   
$clean_data = filter_var($dirty_data, FILTER_SANITIZE_STRING);
echo $clean_data;
``` 

This will effectively remove any malicious scripts from the text. Take a look at the resource in the [PHP documentation](https://www.php.net/manual/en/function.filter-var.php) for more details.