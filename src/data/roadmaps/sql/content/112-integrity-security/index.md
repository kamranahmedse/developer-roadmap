# Data Integrity and Security

Integrity Security in SQL refers to the accuracy and consistency of the data in a database. It is a crucial aspect of the database that ensures the data being entered into databases follows the defined rules, preventing any damage to the main data. It comes in several forms:

**1. Entity Integrity**

Entity integrity ensures that there are no duplicate rows in a table. This is often managed with the help of the primary key.

For example, consider the following SQL command to create a table. Primary Key on the EmployeeID column will ensure that every entry in this column is unique.

```sql
CREATE TABLE Employee (
  EmployeeID int NOT NULL,
  LastName varchar(255),
  FirstName varchar(255),
  Age int,
  PRIMARY KEY (EmployeeID)
);
```

**2. Domain Integrity**

Domain Integrity enforces valid entries for a given column by restricting the type, the format, or the range of possible values.

For example, setting a specific data type and size for a column.

```sql
CREATE TABLE Employee (
  EmployeeID int NOT NULL,
  LastName varchar(50),
  FirstName varchar(50),
  Age int CHECK (Age>=18 and Age<=60)
);
```

**3. Referential Integrity**

Referential integrity ensures that relationships between tables remain consistent. More specifically, that a foreign key in one table must always refer to the primary key in another table.

```sql
CREATE TABLE Orders (
  OrderID int NOT NULL,
  OrderNumber int NOT NULL,
  EmployeeID int,
  PRIMARY KEY (OrderID),
  FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);
```
**4. User-Defined Integrity**

User-defined integrity refers to a set of rules specified by a user, which do not belong to the entity, domain, or referential integrity.
For example, a user might define a rule that an employee's hire date must be less than 3 months in the future.

Please note that SQL doesn't provide specific built-in functionalities to handle user-defined integrity, it depends on the code logic implemented by each application.
