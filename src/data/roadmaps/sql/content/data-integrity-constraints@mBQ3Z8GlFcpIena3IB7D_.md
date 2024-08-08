# Data Integrity Constraints

SQL constraints are used to specify rules for the data in a table. They ensure the accuracy and reliability of the data within the table. If there is any violation between the constraint and the action, the action is aborted by the constraint.

Constraints are classified into two types: column level and table level. Column level constraints apply to individual columns whereas table level constraints apply to the entire table. 

Here are the commonly used constraints:

## 1. NOT NULL

The `NOT NULL` constraint enforces a field to always contain a value. This means that you cannot insert a new record or update a record without adding a value to this field.

**Example:**

```sql
CREATE TABLE Employees (
    ID int NOT NULL,
    Name varchar(255) NOT NULL,
    Age int
);
```

## 2. UNIQUE

The `UNIQUE` constraint ensures that all values in a column are different, thus, prevents duplicate values in a column.

**Example:**

```sql
CREATE TABLE Employees (
    ID int NOT NULL UNIQUE,
    Name varchar(255) NOT NULL,
    Age int
);
```

## 3. PRIMARY KEY

The `PRIMARY KEY` constraint uniquely identifies each record in a database table. This constraint provides uniqueness for the column or set of columns, and not null.

**Example:**

```sql
CREATE TABLE Employees (
    ID int NOT NULL,
    Name varchar(255) NOT NULL,
    Age int,
    PRIMARY KEY (ID)
);
```

## 4. FOREIGN KEY 

The `FOREIGN KEY` constraint prevents actions that would destroy links between tables. It maintains referential integrity by requiring that a value inserted into a foreign key column exists in the referenced primary key.

**Example:**

```sql
CREATE TABLE Orders (
    OrderID int NOT NULL,
    OrderNumber int NOT NULL,
    EmployeeID int,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(ID)
);
```

## 5. CHECK

The `CHECK` constraint ensures that all values in a field satisfy a condition. It enables a condition to check the value being entered into a record.

**Example:**

```sql
CREATE TABLE Employees (
    ID int NOT NULL,
    Name varchar(255) NOT NULL,
    Age int,
    CHECK (Age>=18)
);
```

Each constraint has its own purpose and usage, utilizing them effectively helps maintain the accuracy and integrity of the data.