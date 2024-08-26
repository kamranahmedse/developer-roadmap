# Transaction Isolation Levels

SQL supports four transaction isolation levels, each differing in how it deals with concurrency and locks to protect the integrity of the data. Each level makes different trade-offs between consistency and performance. Here is a brief of these isolation levels with relevant SQL statements.

1. **READ UNCOMMITTED**
    This is the lowest level of isolation. One transaction may read not yet committed changes made by other transaction, also known as "Dirty Reads". Here's an example of how to set this level:

    ```sql
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    BEGIN TRANSACTION;
    -- Execute your SQL commands here
    COMMIT;
    ```

2. **READ COMMITTED**
    A transaction only sees data changes committed before it started, averting "Dirty Reads". However, it may experience "Non-repeatable Reads", i.e. if a transaction reads the same row multiple times, it might get a different result each time. Here's how to set this level:

    ```sql
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    BEGIN TRANSACTION;
    -- Execute your SQL commands here
    COMMIT;
    ```

3. **REPEATABLE READ**
    Here, once a transaction reads a row, any other transaction's writes (changes) onto those rows are blocked until the first transaction is finished, preventing "Non-repeatable Reads". However, "Phantom Reads" may still occur. Here's how to set this level:

    ```sql
    SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
    BEGIN TRANSACTION;
    -- Execute your SQL commands here
    COMMIT;
    ```

4. **SERIALIZABLE**
    This is the highest level of isolation. It avoids "Dirty Reads", "Non-repeatable Reads" and "Phantom Reads". This is done by fully isolating one transaction from others: read and write locks are acquired on data that are used in a query, preventing other transactions from accessing the respective data. Here's how to set this level:

    ```sql
    SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
    BEGIN TRANSACTION;
    -- Execute your SQL commands here
    COMMIT;
    ```

Remember, higher levels of isolation usually provide more consistency but can potentially decrease performance due to increased waiting times for locks.