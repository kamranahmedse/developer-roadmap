# Adding Extensions

PostgreSQL provides various extensions to enhance its features and functionalities. Extensions are optional packages that can be loaded into your PostgreSQL database to provide additional functionality like new data types or functions. In this section, we will discuss how to add extensions in your PostgreSQL database.

## Pre-installed Extensions

PostgreSQL comes with some pre-installed extensions that can be enabled easily. To see the list of available extensions, you can run the following SQL command:

```sql
SELECT * FROM pg_available_extensions;
```

This command will display a table with columns: `name`, `default_version`, `installed_version`, `comment`.

## Enabling an Extension

To enable an extension, you can use the `CREATE EXTENSION` command followed by the extension name. For example, to enable the `hstore` extension, which is used to enable key-value pairs data storage, you can run the following command:

```sql
CREATE EXTENSION hstore;
```

If you want to enable a specific version of the extension, you can use the `VERSION` keyword followed by the desired version:

```sql
CREATE EXTENSION hstore VERSION '1.4';
```

Remember that you might need to have the necessary privileges to create an extension. For example, you might need to be a superuser or have the `CREATEROLE` privilege.

## Updating an Extension

You can update an installed extension to a new version using the `ALTER EXTENSION` command. For example, to update the `hstore` extension to version '1.5', you can run the following command:

```sql
ALTER EXTENSION hstore UPDATE TO '1.5';
```

## Install Custom Extensions

You can also add custom extensions to your PostgreSQL instance. You can generally find the source code and installation instructions for custom extensions on GitHub or other open-source platforms. Custom extensions may require additional steps such as compiling the source code or updating `pg_config` during the installation process.

## Removing an Extension

If you no longer need an extension, you can remove it using the `DROP EXTENSION` command. For example, to remove the `hstore` extension, you can run the following command:

```sql
DROP EXTENSION hstore;
```

_Remember that removing an extension might lead to loss of data or functionality that was dependent on the extension._

In this section, we covered how to add, enable, update, and remove PostgreSQL extensions. Using extensions can be a powerful way to add new features to your PostgreSQL database and customize your database's functionality according to your needs.