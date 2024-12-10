# Database Transactions

Database transactions in PHP refer to a unit of work performed within a database system, which is treated in a coordinated manner. This technique is vital when dealing with critical tasks like money transfer between accounts, where data consistency is crucial. If one part of the transaction fails, the entire transaction fails, ensuring that the database stays consistent even in an event of a failure.

Visit the following resources to learn more:

- [@official@PHP Documentation - PDO Transactions](https://www.php.net/manual/en/pdo.transactions.php)