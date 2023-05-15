# Advanced SQL: Triggers

Triggers are special user-defined functions that get invoked automatically when an event (like INSERT, UPDATE, DELETE, or TRUNCATE) occurs on a specified table or view. They allow you to perform additional actions when data is modified in the database, helping to maintain the integrity and consistency of your data.

## Purpose of Triggers

Triggers can be used to:

* Enforce referential integrity between related tables
* Validate input data
* Create and maintain an audit history of any changes in the table
* Perform custom actions based on changes in the table (e.g., send notifications, execute business logic)

## Creating Triggers

To create a trigger, you must first define a trigger function, and then bind it to a table or a view. A trigger function can be written in various languages, such as PL/pgSQL, PL/Tcl, or others. The following is an example of creating a simple trigger function and trigger:

```sql
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.modified = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_modified_trigger
BEFORE UPDATE ON your_table
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
```

In this example, we created a trigger function `update_modified_column()` which updates the `modified` column with the current timestamp. We then created a trigger `update_modified_trigger` which binds this function to the `your_table` table. The trigger is set to execute `BEFORE UPDATE` and for `EACH ROW`.

## Trigger Events

There are four events that can be associated with a trigger:

* INSERT
* UPDATE
* DELETE
* TRUNCATE

You can also associate multiple events with a single trigger by using the `OR` keyword:

```sql
CREATE TRIGGER your_trigger
BEFORE INSERT OR UPDATE OR DELETE ON your_table
...
```

## Timing

Triggers can be set to execute at different times:

* BEFORE: The trigger executes before the event occurs.
* AFTER: The trigger executes after the event occurs.
* INSTEAD OF: The trigger executes instead of the event on a view (only applicable for views).

## Granularity

Triggers can be set to execute at different granularity levels:

* FOR EACH ROW: The trigger executes once for each row affected by the event
* FOR EACH STATEMENT: The trigger executes once for each INSERT, UPDATE, DELETE, or TRUNCATE statement

## Conclusion

Triggers are an invaluable tool for maintaining data integrity and consistency in your PostgreSQL database. By understanding how to create and use triggers, you can effectively automate complex actions and logic in response to changes in your data.

Remember that triggers can also add complexity to your system, and as such, should be well-documented and carefully managed. Always consider the performance implications of using triggers, and ensure that your trigger functions are optimized for your database architecture.