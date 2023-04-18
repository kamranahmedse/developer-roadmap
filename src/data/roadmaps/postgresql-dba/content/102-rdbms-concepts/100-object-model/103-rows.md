# Rows

# Rows in PostgreSQL

Rows, also known as "tuples" in PostgreSQL, represent individual records in a table. They are a fundamental part of the PostgreSQL object model because they store the data you will manipulate and query throughout your time as a Database Administrator. In this section, we will delve deeper into the topic of rows, and explore their properties and how they are managed within your database.

## Properties of Rows

A few key properties distinguish rows in PostgreSQL:

1. **Order**: Although the SQL standard does not enforce a specific order for rows in a table, PostgreSQL stores tuples in a deterministic order based on their primary keys or the method of insertion.

2. **Uniqueness**: The uniqueness of rows is generally enforced through either a primary key, unique constraint, or unique index, which guarantees that no two rows in a table have the same set of values for specified columns.

3. **Immutability**: Rows in PostgreSQL are immutable, which means that once a row has been created, it cannot be updated. Instead, an "update" operation results in a new row being made to represent the updated state of the record, and the original row is marked for deletion.

4. **Visibility**: A row in PostgreSQL can have different visibility levels depending on transactions' isolation levels or concurrent changes. This concept is important to understand for managing and maintaining transaction management and concurrency in PostgreSQL.

## Managing Rows

As a PostgreSQL database administrator, there are several ways to manage rows, including:

- **INSERT**: The `INSERT` statement is used to add new rows to a table. You can specify the values for each column or use a subquery to source data from another table or external source:

```sql
INSERT INTO your_table (column1, column2)
VALUES ('value1', 'value2');
```

- **UPDATE**: Updating an existing row involves creating a new row with the updated values and marking the old row for deletion. It is crucial to keep in mind that updating rows can cause bloat in the associated table and indexes, which may require periodic maintenance like vacuuming:

```sql
UPDATE your_table
SET column1 = 'new_value1'
WHERE column2 = 'value2';
```

- **DELETE**: To delete a row, mark it for removal by using the `DELETE` statement. Deleted rows remain in the table until the system decides it's safe to remove them or if you perform a vacuum operation:

```sql
DELETE FROM your_table
WHERE column1 = 'value1';
```

## Performance Considerations

Maintaining the proper design and indexing strategy for your tables is crucial for efficient row management in PostgreSQL. Some tips to consider include:

- Favoring smaller, well-designed tables that minimize the need for updates, as updates cause table and index bloat.
- Leveraging appropriate indexes to improve the efficiency of lookup, update, and delete operations.
- Regularly performing maintenance tasks such as vacuuming, analyzing, and reindexing to keep performance optimal.

In conclusion, understanding the properties of rows and their management is essential for any PostgreSQL DBA. By maintaining efficient tables, indexes, and row manipulation, you can achieve optimal performance and stability in your PostgreSQL-based applications.