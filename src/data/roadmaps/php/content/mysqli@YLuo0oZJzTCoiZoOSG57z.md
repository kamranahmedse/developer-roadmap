# MySQLi

MySQLi is a PHP extension that allows PHP programs to connect with MySQL databases. This extension provides the capability to perform queries, retrieve data, and perform complex operations on MySQL databases using PHP. MySQLi comes with an object-oriented and procedural interface and supports prepared statements, multiple statements, and transactions. 

Here's a basic example of using MySQLi to connect to a MySQL database:

```php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
```

Visit the following resources to learn more:

- [@official@MySQLi](https://www.php.net/manual/en/book.mysqli.php)