# Row Level Security (RLS)

Row Level Security (RLS) is a feature introduced in PostgreSQL 9.5 that allows you to control access to rows in a table based on a user or role's permissions. This level of granularity in data access provides an extra layer of security for protecting sensitive information from unauthorized access.

## Enabling Row Level Security

To enable RLS, you need to set up policies for your table. A policy is a set of rules that define how users can read or modify table rows. First, enable RLS on the table using the `ALTER TABLE` command with the `FORCE ROW LEVEL SECURITY` option:

```sql
ALTER TABLE my_table FORCE ROW LEVEL SECURITY;
```

## Creating Policies

To create a policy, use the `CREATE POLICY` command with a `USING` clause that specifies the conditions for allowing access to a row. Here's an example of a policy that allows users to read rows only if the user's `id` is equal to the `user_id` column in the table:

```sql
CREATE POLICY my_policy ON my_table 
FOR SELECT 
USING (current_user_id() = user_id);
```

You can also create policies for modifying rows by specifying the `FOR` action as `INSERT`, `UPDATE`, or `DELETE`.

## Example: Role-Based RLS

Suppose you want to restrict access based on user roles. In this example, we have three roles: `admin`, `manager`, and `employee`. We want to give `admin` access to all rows, `manager` access to rows of their department, and `employee` access only to their own rows.

First, create policies for each role:

```sql
-- Admin Policy
CREATE POLICY admin_policy ON my_table 
FOR ALL 
USING (current_role = 'admin');

-- Manager Policy
CREATE POLICY manager_policy ON my_table 
FOR SELECT 
USING (current_role = 'manager' AND department_id = current_department_id());

-- Employee Policy
CREATE POLICY employee_policy ON my_table 
FOR SELECT 
USING (current_role = 'employee' AND user_id = current_user_id());
```

With these policies in place, users with different roles will have access to rows as per their designated privileges.

In summary, Row Level Security is a powerful feature in PostgreSQL that helps you control access to your data at a granular level. By defining policies and conditions for each user or role, you can ensure that sensitive information is protected, and users only have access to the data they need.