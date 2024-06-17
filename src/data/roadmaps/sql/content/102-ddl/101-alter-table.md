# Alter Table

The `ALTER TABLE` command in SQL is used to add, delete/drop, or modify columns in an existing table. It's also useful for adding and dropping constraints such as primary key, foreign key, etc. 

## Add Column

A single column can be added using the following syntax:

```sql
ALTER TABLE tableName
ADD columnName datatype;
```

To add more than one column:

```sql
ALTER TABLE tableName
ADD (columnName1 datatype,
     columnName2 datatype,
     ...
     );
```

## Drop Column

To drop a single column:

```sql
ALTER TABLE tableName
DROP COLUMN columnName;
```

To drop multiple columns:

```sql
ALTER TABLE tableName
DROP (columnName1,
       columnName2,
       ...
      );
```

## Modify Column

To modify the datatype of a column:

```sql
ALTER TABLE tableName
MODIFY COLUMN columnName newDataType;
```

## Add/Drop Constraints

To add constraints:

```sql
ALTER TABLE tableName
ADD CONSTRAINT constraintName
PRIMARY KEY (column1, column2, ... column_n);
```

To drop constraints:

```sql
ALTER TABLE tableName
DROP CONSTRAINT constraintName;
```

To drop PRIMARY KEY:

```sql
ALTER TABLE table_name
DROP PRIMARY KEY;
```
In conclusion, `ALTER TABLE` in SQL lets you alter the structure of an existing table. This is a powerful command that lets you dynamically add, modify, and delete columns as well as the constraints placed on them. It ensures you are more flexible in dealing with changing data storage requirements.
