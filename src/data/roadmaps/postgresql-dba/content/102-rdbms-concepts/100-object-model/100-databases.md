# Databases

# Databases in PostgreSQL

In this section, we will discuss the significance and functionality of databases in PostgreSQL, as well as provide some examples for creating, managing, and connecting to databases.

## Overview

A *database* in PostgreSQL is a collection of related data, consisting of tables, indexes, functions, views, and other objects. PostgreSQL uses a client-server model, and a database is where all the client connections and transactions occur. PostgreSQL supports multiple databases within a single database cluster, which assures data isolation and convenient management of different applications within the same server instance.

## Creating a Database

To create a database, use the command `CREATE DATABASE` followed by the name of the database:

```sql
CREATE DATABASE database_name;
```

For example, to create a database named "mydb":

```sql
CREATE DATABASE mydb;
```

You can also specify additional options, such as the owner of the database, the encoding and collation, and more:

```sql
CREATE DATABASE database_name
OWNER username
ENCODING 'encoding_name'
LC_COLLATE 'collation_name'
LC_CTYPE 'ctype_name'
TEMPLATE template_name
TABLESPACE tablespace_name;
```

## Listing Databases

To see a list of all databases in your PostgreSQL instance, use the `\l` command in the `psql` command prompt:

```
\l
```

You will see a list of databases with their names, owners, characters set encoding, collation, and other details.

## Connecting to a Database

To connect to a specific database, use the `\c` or `\connect` command in `psql`, followed by the database name:

```
\c database_name
```

Alternatively, you can connect to a database from the command line when starting `psql`:

```
psql -h hostname -p port -U username -d database_name
```

## Managing Databases

You can modify the properties of an existing database with the `ALTER DATABASE` command:

```sql
ALTER DATABASE database_name
[OWNER TO new_owner]
[SET configuration_parameter { TO | = } { value | DEFAULT }]
[RESET configuration_parameter]
[WITH new_options];
```

To drop a database, use the `DROP DATABASE` command:

```sql
DROP DATABASE database_name;
```

**Caution: Dropping a database will permanently delete all data and objects contained within it.**

## Conclusion

Understanding databases in PostgreSQL is crucial for managing and organizing your data. In this section, we discussed the basics of creating, listing, connecting to, and managing databases in PostgreSQL. As a DBA, you will need to be familiar with these concepts to ensure proper data management and isolation for various applications within your PostgreSQL instance.