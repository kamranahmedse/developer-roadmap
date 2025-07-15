# Connection Pooling

Connection pooling is a technique used in PHP to manage and maintain multiple open connections with a database. It reduces the time overhead of constantly opening and closing connections, and ensures efficient utilisation of resources. Connection pooling limits the number of connections opened with the database and instead reuses a pool of existing active connections, thereby significantly enhancing the performance of PHP applications. When a PHP script needs to communicate with the database, it borrows a connection from this pool, performs the operations, and then returns it back to the pool. Although PHP doesn't have native support for connection pooling, it can be achieved through third-party tools like 'pgBouncer' when using PostgreSQL or 'mysqlnd_ms' plugin with MySQL. Note, it's recommended to use connection pooling when you've a high-traffic PHP application. 

Visit the following resources to learn more:

- [@official@Connection Pooling](https://www.php.net/manual/en/oci8.connection.php)
- [@official@Database Extensions](https://www.php.net/manual/en/refs.database.php)