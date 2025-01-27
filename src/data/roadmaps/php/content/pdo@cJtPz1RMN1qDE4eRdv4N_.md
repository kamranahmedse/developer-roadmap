# PDO

PDO (PHP Data Objects) is an interface in PHP that provides a lightweight, consistent way for working with databases in PHP. PDO allows you to use any database without changing your PHP code, making your code database-independent. Furthermore, it offers robust error handling and can utilize prepared statements to prevent SQL injection attacks. Here is how you could connect and fetch data from a MySQL database using PDO:

```php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=test', 'username', 'password');
    $stmt = $pdo->query('SELECT * FROM myTable');
    while ($row = $stmt->fetch()) {
        echo $row['name'] . "\n";
    }
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
```

Visit the following resources to learn more:

- [@official@Data Objects](https://www.php.net/manual/en/book.pdo.php)