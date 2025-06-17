Normalization is a way to organize your database so you don't repeat data unnecessarily. It helps keep your data clean, avoids update issues, and makes the structure easier to manage as your app grows.

The main goals:

- Avoid repeating the same data in different places.
- Make updates and insert more reliably.
- Keep queries simple and logical.
- Make it easier to adjust your schema later.

Before normalization:

```sql
CREATE TABLE orders_unnormalized (
    order_id INT,
    product_name VARCHAR(100),
    product_category VARCHAR(50),
    product_price DECIMAL(10,2),
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    customer_address VARCHAR(200)
);
```

After normalization:

```sql
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    address VARCHAR(200)
);

CREATE TABLE products (
    product_id INT PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(50),
    price DECIMAL(10,2)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    product_id INT REFERENCES products(product_id),
    order_date DATE
);
```

While normalization offers many benefits, if you normalize too much, you might end up with too many small tables and lots of joins, which can slow down performance in read-heavy systems. 