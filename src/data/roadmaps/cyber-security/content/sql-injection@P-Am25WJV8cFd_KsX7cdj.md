# What is SQL Injection?

**SQL Injection** is a type of web application security vulnerability that allows an attacker to inject malicious SQL code into a web application's database, potentially leading to unauthorized data access, modification, or deletion.

## How does it work?

**Here's a simplified example:** Imagine a web application that allows users to log in with a username and password. The application uses a SQL query to verify the credentials:
```
SELECT * FROM users WHERE username = '$username' AND password = '$password'
```
The application takes the user-inputted username and password and inserts them directly into the SQL query.
Now, let's say an attacker inputs the following username:
```
' OR 1=1 --
```
The resulting SQL query would be:
```
SELECT * FROM users WHERE username = '' OR 1=1 --' AND password = '$password'
```
The `--` comment at the end of the input effectively comments out the rest of the query, and the `OR 1=1` condition always evaluates to TRUE, allowing the attacker to bypass the authentication mechanism.

## Types of SQL Injection:

- **Classic SQL Injection:** This is the most common type, where an attacker injects malicious SQL code as user input. 
- **Blind SQL Injection:** In this type, the attacker injects malicious SQL code, but the application doesn't display any error messages or data. The attacker must use inference techniques to determine the structure of the database.
- **Time-Based SQL Injection:** This type involves injecting malicious SQL code that takes advantage of the time it takes for the database to respond. The attacker can use this to infer the structure of the database.
- **Boolean-Based SQL Injection:** Similar to blind SQL injection, but the attacker uses boolean logic to infer the structure of the database.

## How to prevent SQL Injection:

- **Use prepared statements:** Instead of directly inserting user input into SQL queries, use prepared statements with parameterized queries.
- **Input validation and sanitization:** Validate and sanitize user input to prevent malicious data from being injected.
- **Limit database privileges:** Ensure that the database user account has only the necessary privileges to perform the required actions.
- **Regularly update and patch software:** Keep your web application and database software up-to-date with the latest security patches.
- **Monitor database logs:** Regularly monitor database logs to detect and respond to potential SQL injection attacks.

Visit the following resources to learn more:

- [@article@PortSwigger - SQL Injection](https://portswigger.net/web-security/sql-injection)
