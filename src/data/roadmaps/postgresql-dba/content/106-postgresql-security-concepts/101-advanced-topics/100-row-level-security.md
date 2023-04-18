# Row-Level Security

## Row Level Security

Row Level Security (RLS) is a powerful feature introduced in PostgreSQL 9.5, which allows you to control access to individual rows in a database table based on specific policies. This level of granularity can help ensure that only authorized users can access, update or delete certain records in a table.

### When to use RLS

Row Level Security is suitable when you want to provide access control to a more granular level, such as:

- Multi-tenant applications where each tenant should only see and modify their own data.
- Applications dealing with sensitive information, requiring fine-grained access control to specific rows in a table.

### Steps to Implement Row Level Security

1. **Enable RLS for a table**

   To enable RLS for a table, you use the `ALTER TABLE` command with the `ENABLE ROW LEVEL SECURITY` option.

   ```
   ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
   ```

2. **Create a security policy**

   A security policy is a set of rules that define the conditions for access, modification or deletion of a row within the target table. You use the `CREATE POLICY` command to define a security policy.

   ```
   CREATE POLICY policy_name
   ON table_name
   [USING (predicate_expression)]
   [WITH CHECK (predicate_expression)];
   ```

   - `USING (predicate_expression)`: Defines the condition for selecting rows (read access).
   - `WITH CHECK (predicate_expression)`: Defines the condition for updating or deleting rows (write access).

3. **Apply the security policy**

   A security policy can be applied globally, per role or per user. You use the `ALTER TABLE` command with the `FORCE ROW LEVEL SECURITY` option to apply the policy.

   ```
   ALTER TABLE table_name FORCE ROW LEVEL SECURITY;
   ```

### Example

Let's consider that we have a `invoices` table that contains invoice records for different customers. Suppose we want to restrict access to specific invoices by customer.

1. Enable RLS for the `invoices` table:

   ```
   ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
   ALTER TABLE invoices FORCE ROW LEVEL SECURITY;
   ```

2. Create a security policy:

   ```
   CREATE POLICY customer_access_policy
   ON invoices
   USING (customer_id = get_current_customer_id())
   WITH CHECK (customer_id = get_current_customer_id());
   ```

   Here, we create a policy `customer_access_policy` with a predicate expression that checks if the `customer_id` matches the current customer's ID. The `get_current_customer_id()` function should be created to return the ID of the currently logged in customer.

With this example, we have successfully implemented Row Level Security on the `invoices` table to ensure that customers only have access to their own invoices.

### Limitations & Precautions

- RLS policies are transparent to the end user and run behind the scenes, which means that a user may not be aware of the policy affecting the query results.
- Be cautious when using `GRANT ALL` privileges on a table with enabled RLS. This will give a user access to not only the data, but also the ability to disable or alter the security policy.
- RLS policies will only protect sensitive data if they're well-designed and thoughtful. If you're dealing with highly sensitive information, consider using additional security measures like encryption or database schema separation.