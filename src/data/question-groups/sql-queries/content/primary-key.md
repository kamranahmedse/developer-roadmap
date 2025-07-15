A primary key is the unique identifier of a row of data in a table. You use it to identify each row uniquely, and no two rows can have the same primary key. A primary key column cannot be null. In the example below, `user_id` is the primary key.

```sql
CREATE TABLE users (
   user_id INT PRIMARY KEY,
   name VARCHAR(100),
   phoneNumber VARCHAR(100)
);
``` 