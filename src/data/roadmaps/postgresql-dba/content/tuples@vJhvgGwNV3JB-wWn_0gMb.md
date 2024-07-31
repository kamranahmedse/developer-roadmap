# Tuples

In the relational model, a **tuple** is a fundamental concept that represents a single record or row in a table. In PostgreSQL, a tuple is composed of a set of attribute values, each corresponding to a specific column or field in the table. A tuple is defined as an ordered set of attribute values, meaning that each value in a tuple corresponds to a specific attribute or column in the table. The values can be of different data types, such as integers, strings, or dates, depending on the schema of the table.

For example, consider a `users` table with columns `id`, `name`, and `email`. A sample tuple in this table could be `(1, 'John Smith', 'john.smith@example.com')`, where each value corresponds to its respective column. PostgreSQL provides a variety of operations that can be performed on tuples, which can be classified into three main categories:

- **Projection**: This operation involves selecting one or more attributes from a tuple and creating a new tuple with only the selected attributes. For example, projecting the `name` and `email` attributes from the previously mentioned tuple would result in `('John Smith', 'john.smith@example.com')`.

- **Selection**: Selection involves filtering tuples based on a specific condition. For example, you may want to select all tuples from the `users` table where the `email` attribute ends with "@example.com".

- **Join**: The join operation combines tuples from two or more tables based on a common attribute or condition. For example, if we have another table called `orders` with a `user_id` column, we could use a join operation to retrieve all records from both tables where the `users.id` attribute matches the `orders.user_id`.

Learn more from the following resources:

- [@article@Whats the difference between and tuple and a row?](https://stackoverflow.com/questions/19799282/whats-the-difference-between-a-tuple-and-a-row-in-postgres)
- [@article@How PostgreSQL freezes tuples](https://medium.com/@hnasr/how-postgres-freezes-tuples-4a9931261fc)