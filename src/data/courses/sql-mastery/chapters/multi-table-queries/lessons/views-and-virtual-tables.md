---
title: Views and Virtual Tables
description: Learn how to create and use SQL views to simplify complex queries
order: 160
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE employee (
      id INT PRIMARY KEY,
      name VARCHAR(100),
      department VARCHAR(100)
  );

  INSERT INTO employee (id, name, department)
  VALUES
      (1, 'John Doe', 'Sales'),
      (2, 'Jane Smith', 'Marketing'),
      (3, 'Alice Johnson', 'Engineering'),
      (4, 'Bob Brown', 'Engineering'),
      (5, 'Charlie Davis', 'Marketing'),
      (6, 'Mike Wilson', 'Sales'),
      (7, 'Sarah Miller', 'Sales'),
      (8, 'Tom Anderson', 'Sales'),
      (9, 'David Chen', 'Engineering'),
      (10, 'Emily Zhang', 'Engineering'),
      (11, 'Ryan Park', 'Engineering');

  CREATE TABLE department (
      id INT PRIMARY KEY,
      name VARCHAR(100)
  );

  CREATE TABLE author (
      id INT PRIMARY KEY,
      name VARCHAR(100)
  );

  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(255),
      cat_id INT,
      subcat_id INT,
      price DECIMAL(10,2),
      stock INT,
      author_id INT,

      FOREIGN KEY (cat_id) REFERENCES category(id),
      FOREIGN KEY (subcat_id) REFERENCES category(id),
      FOREIGN KEY (author_id) REFERENCES author(id)
  );

  INSERT INTO category (id, name)
  VALUES 
      (1, 'Programming'),
      (2, 'Software Engineering'),
      (3, 'Web Development'), 
      (4, 'Programming Languages'),
      (5, 'Fiction'),
      (6, 'Science Fiction'),
      (7, 'Cyberpunk'),
      (8, 'Hard Science Fiction'),
      (9, 'Best Practices'),
      (10, 'Design Patterns'),
      (11, 'JavaScript'),
      (12, 'Python'),
      (13, 'Java');

  INSERT INTO author (id, name)
  VALUES 
      (1, 'Robert C. Martin'),
      (2, 'Martin Fowler'),
      (3, 'Andy Hunt'),
      (4, 'Douglas Crockford'),
      (5, 'Kathy Sierra'),
      (6, 'Frank Herbert'),
      (7, 'Andy Weir'),
      (8, 'William Gibson');

  INSERT INTO book (id, title, cat_id, subcat_id, author_id, price, stock)
  VALUES 
      (1, 'Clean Code', 1, 9, 1, 44.99, 50),
      (2, 'Design Patterns', 1, 10, 2, 54.99, 30),
      (3, 'Python Crash Course', 1, 12, 3, 34.99, 75),
      (4, 'JavaScript: The Good Parts', 1, 11, 4, 29.99, 45),
      (5, 'Head First Java', 1, 13, 5, 44.99, 60),
      (6, 'The Pragmatic Programmer', 1, 9, 3, 39.99, 50),
      (7, 'Dune', 5, 6, 6, 14.99, 100),
      (8, 'Project Hail Mary', 5, 6, 7, 19.99, 80),
      (9, 'Neuromancer', 6, 7, 8, 12.99, 60);
  ```
---

Views in SQL are virtual tables based on the result set of a SQL statement. You can think of them as a stored `SELECT` query that acts as if it were a table. Views don't store data themselves; instead, they provide a way to simplify complex queries.

The syntax for creating a view is:

```sql
CREATE VIEW view_name AS
SELECT ...;
```

Let's create some views to see how they work

## Creating a View

Imagine we have the following `employee` table:

| id  | name          | department  |
| --- | ------------- | ----------- |
| 1   | John Doe      | Sales       |
| 2   | Jane Smith    | Marketing   |
| 3   | Alice Johnson | Engineering |
| 4   | Bob Brown     | Engineering |
| 5   | Charlie Davis | Marketing   |
| 6   | Mike Wilson   | Sales       |
| 7   | Sarah Miller  | Sales       |
| 8   | Tom Anderson  | Sales       |
| 9   | David Chen    | Engineering |
| 10  | Emily Zhang   | Engineering |
| 11  | Ryan Park     | Engineering |

We can create a view that returns all the employees in the `Sales` department using the following SQL statement:

```sql
CREATE VIEW sales_employee AS
SELECT * FROM employee
WHERE department = 'Sales';
```

We can now query this view `sales_employee` as if it was a regular table. For example, the following query will return all the employees in the `Sales` department:

```sql
SELECT * FROM sales_employee;
```

The output will be:

| id  | name         | department |
| --- | ------------ | ---------- |
| 1   | John Doe     | Sales      |
| 6   | Mike Wilson  | Sales      |
| 7   | Sarah Miller | Sales      |
| 8   | Tom Anderson | Sales      |

Let's take a look at a more complex example to see how views can simplify complex queries.

### Complex Query Example

Imagine we have the following `book` table:

| id  | title                      | cat_id | subcat_id | author_id | price | stock |
| --- | -------------------------- | ------ | --------- | --------- | ----- | ----- |
| 1   | Clean Code                 | 1      | 9         | 1         | 44.99 | 50    |
| 2   | Design Patterns            | 1      | 10        | 2         | 54.99 | 30    |
| 3   | Python Crash Course        | 1      | 12        | 3         | 34.99 | 75    |
| 4   | JavaScript: The Good Parts | 1      | 11        | 4         | 29.99 | 45    |
| 5   | Head First Java            | 1      | 13        | 1         | 44.99 | 60    |
| 6   | The Pragmatic Programmer   | 1      | 9         | 2         | 39.99 | 50    |
| 7   | Dune                       | 5      | 6         | 6         | 14.99 | 100   |
| 8   | Project Hail Mary          | 5      | 6         | 7         | 19.99 | 80    |
| 9   | Neuromancer                | 6      | 7         | 8         | 12.99 | 60    |

`cat_id` and `subcat_id` are foreign keys that reference the `id` column in the `category` table which has the following data:

| id  | name                  |
| --- | --------------------- |
| 1   | Programming           |
| 2   | Software Engineering  |
| 3   | Web Development       |
| 4   | Programming Languages |
| 5   | Fiction               |
| 6   | Science Fiction       |
| 7   | Cyberpunk             |
| 8   | Hard Science Fiction  |
| 9   | Best Practices        |
| 10  | Design Patterns       |

`author_id` is a foreign key that references the `id` column in the `author` table which has the following data:

| id  | name              |
| --- | ----------------- |
| 1   | Robert C. Martin  |
| 2   | Martin Fowler     |
| 3   | Andy Hunt         |
| 4   | Douglas Crockford |
| 5   | Kathy Sierra      |
| 6   | Frank Herbert     |
| 7   | Andy Weir         |
| 8   | William Gibson    |

Let's write a `SELECT` query that returns all the books along with their category and author names.

```sql
SELECT
    b.id,
    b.title,
    p.name as "parent_category",
    s.name as "sub_category",
    a.name as "author",
    b.price,
    b.stock
FROM book b
    INNER JOIN category p ON b.cat_id = p.id
    INNER JOIN category s ON b.subcat_id = s.id
    INNER JOIN author a ON b.author_id = a.id;
```

The output from this query will contain all the books along with their category and author names.

| id  | title                      | parent_category | sub_category    | author            | price | stock |
| --- | -------------------------- | --------------- | --------------- | ----------------- | ----- | ----- |
| 6   | The Pragmatic Programmer   | Programming     | Best Practices  | Andy Hunt         | 39.99 | 50    |
| 5   | Head First Java            | Programming     | Java            | Kathy Sierra      | 44.99 | 60    |
| 4   | JavaScript: The Good Parts | Programming     | JavaScript      | Douglas Crockford | 29.99 | 45    |
| 3   | Python Crash Course        | Programming     | Python          | Andy Hunt         | 34.99 | 75    |
| 2   | Design Patterns            | Programming     | Design Patterns | Martin Fowler     | 54.99 | 30    |
| 1   | Clean Code                 | Programming     | Best Practices  | Robert C. Martin  | 44.99 | 50    |
| 8   | Project Hail Mary          | Fiction         | Science Fiction | Andy Weir         | 19.99 | 80    |
| 7   | Dune                       | Fiction         | Science Fiction | Frank Herbert     | 14.99 | 100   |
| 9   | Neuromancer                | Science Fiction | Cyberpunk       | William Gibson    | 12.99 | 60    |

Now imagine having to write this complex join query every time you need to see book details with their categories and authors. We can simplify our queries greatly by creating a view that encapsulates this complex query:

```sql
CREATE VIEW enriched_book AS
SELECT
    b.id,
    b.title,
    p.name as parent_category,
    s.name as sub_category,
    a.name as author,
    b.price,
    b.stock
FROM book b
    INNER JOIN category p ON b.cat_id = p.id
    INNER JOIN category s ON b.subcat_id = s.id
    INNER JOIN author a ON b.author_id = a.id;
```

Now, to get all the books along with their category and author names, we can simply query this view:

```sql
SELECT * FROM enriched_book;
```

We can perform any query on this view as if it was a regular table. For example, the following query will return all the books in the `Programming` category:

```sql
SELECT title, author, price
FROM enriched_book
WHERE parent_category = 'Programming';
```

To query all the books in `Programming` category that are under $40, we can simply write:

```sql
SELECT title, author, price
FROM enriched_book
WHERE parent_category = 'Programming'
AND price < 40;
```

### Creating a View that uses another View

We can even create a view that uses another view in its query. For example, the query below uses `enriched_book` view and creates another view called `affordable_programming_book` that returns all the programming books under $40:

```sql
CREATE VIEW affordable_programming_book AS
SELECT
    title,
    author,
    sub_category,
    price
FROM enriched_book
WHERE parent_category = 'Programming'
AND price < 40.00;
```

Now we can query `affordable_programming_book` view and get all the programming books under $40:

```sql
SELECT * FROM affordable_programming_book;
```

## Updating Views

You can update the underlying query of a view using the `CREATE OR REPLACE VIEW` statement.

For example, the following statement updates the `enriched_book` view to include the `author_id` aliased as `aid` column:

```sql
CREATE OR REPLACE VIEW enriched_book AS
SELECT
    b.id,
    b.title,
    p.name as parent_category,
    s.name as sub_category,
    a.name as author,
    b.price,
    b.stock,
    b.author_id as aid   -- new column added to the view
FROM book b
    INNER JOIN category p ON b.cat_id = p.id
    INNER JOIN category s ON b.subcat_id = s.id
    INNER JOIN author a ON b.author_id = a.id;
```

## Dropping Views

To remove a view, use the DROP VIEW statement:

```sql
DROP VIEW book_details;
```

> ### Can I Update Data Through Views?
>
> Some views allow you to perform `INSERT`, `UPDATE`, and `DELETE` operations through them. However, this is only possible if the view meets certain criteria:
>
> - The view must only reference one table i.e. no joins
> - No constraints on the table are violated with the query
> - The view must include the primary key of the base table
> - The view cannot include `GROUP BY` or `HAVING` clauses
> - The view cannot use `DISTINCT` or aggregate functions
>
> Here's an example of an updatable view:
>
> ```sql
> CREATE VIEW programming_inventory AS
> SELECT id, title, price, stock
> FROM book
> WHERE cat_id = 1;  -- Programming category
> ```
>
> You can update this view:
>
> ```sql
> UPDATE programming_inventory
> SET price = 49.99
> WHERE title = 'Clean Code';
> ```
>
> However, the `enriched_book` view that we created earlier is not updatable because it joins multiple tables.

---

Views are powerful tools that can help you organize and simplify your database interactions. They're especially useful when:

- You have complex joins that you need to run frequently
- You want to provide a simplified interface to your data
- You need to implement row-level or column-level security
- You want to maintain backward compatibility when database schemas change

Remember that while views don't store data themselves, they can impact performance if not used carefully. Complex views with multiple joins might be slower than writing the query directly. Always consider the trade-off between convenience and performance when creating views.
