# Connect using `psql`

## Connect using psql

`psql` is a command-line utility that comes with PostgreSQL to easily interact with the database server. It is a powerful tool that provides a feature-rich querying interface for executing SQL commands, managing databases, users, and more. In this section, we will discuss how to connect to a PostgreSQL database using `psql`.

### Prerequisites

Before you can use `psql` to connect to a PostgreSQL server, make sure you have the following:

- PostgreSQL server is up and running.
- Required access to connect with the target database (username, password, and database name).

### Connecting to a Database

To connect to a PostgreSQL database using `psql`, open up a terminal on the machine where you have PostgreSQL installed and follow the steps below.

1. **Use the following command format to connect to a database:**

   ```bash
   psql -h <hostname> -p <port> -U <username> -d <database_name>
   ```

   Replace the following placeholders in the command above:
   - `<hostname>`: The address of the machine where the PostgreSQL server is running on (localhost, if on the same machine as psql).
   - `<port>`: The port number on which the PostgreSQL server is listening (default is 5432).
   - `<username>`: The PostgreSQL user you want to connect as.
   - `<database_name>`: The name of the database you want to connect to.

   For example, if you want to connect to a database named `mydb` on a localhost as a user named `postgre`, the command would look like:

   ```bash
   psql -h localhost -p 5432 -U postgre -d mydb
   ```

2. **Enter your password:** After running the command, you will be prompted to enter the password for the specified user. Enter the password and press `Enter`.

3. **Connected to the Database:** If the connection is successful, you will see the `psql` prompt that looks like below, and you can start executing SQL commands:

   ```
   postgre=>
   ```

### Basic psql Commands

Here are some basic `psql` commands to get you started:

- `\l`: List all databases.
- `\dt`: List all tables in the currently connected database.
- `\c <database_name>`: Connect to another database.
- `\q`: Quit the psql program.

Now you should be able to connect to a PostgreSQL database using `psql`. Happy querying!