# Performance Optimization

Performance Optimization linked with Advanced Database Techniques in PHP ensures your database-driven applications run efficiently. This involves techniques like indexing, using EXPLAIN SQL command, de-normalization, and caching query results. For instance, an effective technique is caching query results, which can significantly reduce the number of database calls. PHP offers functions to serialize and unserialize data, you can store your result set in a serialized form and when needed, retrieve it quickly, unserialize it and voila, you have your data ready with no database calls. Here's a simple example of caching MySQL query with PHP:

```
$query = "SELECT * FROM my_table";
$cache_file = '/tmp/cache/' . md5($query);

if (file_exists($cache_file)) {
    $result_set = unserialize(file_get_contents($cache_file));
} else {
    $result= mysql_query($query);
    $result_set= array();
    while ($row = mysql_fetch_array($result)) {
        $result_set[]= $row;
    }
    file_put_contents($cache_file, serialize($result_set));
}
```

For more information, refer to the official [PHP documentation](https://www.php.net/manual/en/book.mysql.php).