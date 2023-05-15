# Role-based access control

Role-Based Access Control (RBAC) is an approach to restricting the access of users to perform certain tasks, view data, or execute specific commands. In MongoDB, RBAC is an essential aspect to ensure security within the database.

Each role in MongoDB consists of a set of privileges that determine the user's abilities within the system. MongoDB has several built-in roles, and you also have the option to create custom roles as needed. By assigning the appropriate roles to users, you can limit their access to various parts of the database and protect sensitive information.

## Built-in Roles

MongoDB provides several built-in roles that have predefined sets of privileges:

- **Read**: Allows read operations on the specified database.
- **ReadWrite**: Allows read and write operations on the specified database.
- **dbAdmin**: Allows administrative tasks, such as managing indexes and user-defined roles, for the specified database.
- **userAdmin**: Allows managing user access for the specified database.
- **ClusterAdmin**: Allows administrative tasks for the entire cluster, such as configuring replica sets and sharding.
- **ReadAnyDatabase**: Allows read operations on all databases except for the `local` and `config` databases.
- **ReadWriteAnyDatabase**: Allows read and write operations on all databases except for the `local` and `config` databases.
- **userAdminAnyDatabase**: Allows managing user access for all databases except for the `local` and `config` databases.
- **dbAdminAnyDatabase**: Allows administrative tasks for all databases except for the `local` and `config` databases.

## Custom Roles

In addition to the built-in roles, you can create custom roles to cater to specific requirements of your application. Custom roles can have any combination of built-in roles' privileges and user-defined actions.

To create a custom role, you can use the `db.createRole()` method. Here's an example:

```javascript
db.createRole({
  role: 'customRole',
  privileges: [
    {
      resource: { db: 'exampleDB', collection: '' },
      actions: ['find', 'insert', 'update', 'remove'],
    },
  ],
  roles: [],
});
```

In the example above, we created a custom role `customRole` with privileges that allow users with this role to perform `find`, `insert`, `update`, and `remove` operations on all collections within the `exampleDB` database.

## Assigning Roles to Users

To ensure that users have the appropriate level of access and permissions, you assign specific roles to them. When creating a new user, you can assign roles using the `db.createUser()` method. Here's an example:

```javascript
db.createUser({
  user: 'exampleUser',
  pwd: 'examplePassword',
  roles: [
    { role: 'read', db: 'exampleDB' },
    { role: 'customRole', db: 'exampleDB' },
  ],
});
```

In this example, we created a new user `exampleUser` and assigned the built-in `read` role and a custom `customRole` role.

By effectively using role-based access control, you can strengthen the security of your MongoDB database and protect sensitive data from unauthorized access.
