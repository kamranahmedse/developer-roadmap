# Operators

SQL operators are used to perform operations like comparisons and arithmetic calculations. They are very crucial in
forming queries. SQL operators are divided into the following types:

1. **Arithmetic Operators**: These are used to perform mathematical operations. Here is a list of these operators:

    - `+` : Addition
    - `-` : Subtraction
    - `*` : Multiplication
    - `/` : Division
    - `%` : Modulus

   Example:

    ```sql
    SELECT product, price, (price * 0.18) as tax
    FROM products;
    ```

2. **Comparison Operators**: These are used in the where clause to compare one expression with another. Some of these
   operators are:

    - `=` : Equal
    - `!=` or `<>` : Not equal
    - `>` : Greater than
    - `<` : Less than
    - `>=`: Greater than or equal
    - `<=`: Less than or equal

   Example:

    ```sql
    SELECT name, age
    FROM students
    WHERE age > 18;
    ```

3. **Logical Operators**: They are used to combine the result set of two different component conditions. These include:

    - `AND`: Returns true if both components are true.
    - `OR` : Returns true if any one of the component is true.
    - `NOT`: Returns the opposite boolean value of the condition.

   Example:

    ```sql
    SELECT * 
    FROM employees
    WHERE salary > 50000 AND age < 30;
    ```

4. **Bitwise Operators**: These perform bit-level operations on the inputs. Here is a list of these operators:

    - `&` : Bitwise AND
    - `|` : Bitwise OR
    - `^` : Bitwise XOR

   Bitwise operators are much less commonly used in SQL than the other types of operators.

Remember, the datatype of the result is dependent on the types of the operands.