# check_pgactivity

## Check_pgactivity

Check_pgactivity is a popular monitoring tool designed specifically for PostgreSQL. It is an efficient and flexible solution to monitor various aspects of a PostgreSQL database such as connectivity, queries, locks, and other key performance indicators. This tool provides an easy-to-use interface to collect and store PostgreSQL performance data, which makes it a helpful resource for database administrators and developers to keep their databases running efficiently.

### Features

- **Wide range of monitors:** Check_pgactivity offers numerous service checks, including database connections, query durations, transactions, WAL files, Bloat, and much more. This enables users to gain insights on virtually every important aspect of their PostgreSQL environment.

- **Nagios Integration:** The tool seamlessly integrates with Nagios, a widely-used open-source monitoring solution, allowing administrators to include PostgreSQL monitoring into their existing monitoring setup with ease.

- **Flexible output:** Check_pgactivity generates output that is compatible with various monitoring solutions, making it flexible enough to adapt to different systems' requirements.

- **Custom thresholds and alerts:** Users can set specific thresholds and alerts for certain metrics, allowing them to detect potential issues early on and take appropriate action.

- **Perl-based:** Being a Perl script, check_pgactivity is lightweight and easy to integrate into existing tools and workflows.

### Usage

To use check_pgactivity, you will first need to install it on your system. You can download the latest version from the [official repository](https://github.com/OPMDG/check_pgactivity/releases). Ensure that you have the required Perl modules (DBD::Pg and DBI) installed.

Once installed, you can execute the script to perform different monitoring tasks:

```
check_pgactivity -s <SERVICE_NAME> -h <HOSTNAME> -U <USERNAME> -p <PORT> -d <DB_NAME>
```

Replace the placeholders with appropriate connection details, and choose the desired service check as per your monitoring requirements. For a full list of supported services, refer to the [official documentation](https://github.com/OPMDG/check_pgactivity/blob/master/doc/check_pgactivity.pod).

### Examples

To monitor the number of connections in a PostgreSQL database:

```
check_pgactivity -s connections -h localhost -U postgres -p 5432 -d my_database
```

To check the oldest transaction:

```
check_pgactivity -s oldest_2pc -h localhost -U postgres -p 5432 -d my_database
```

In conclusion, check_pgactivity is a powerful and versatile tool that can help you effectively monitor your PostgreSQL databases. By tracking various performance metrics and integrating with other monitoring solutions like Nagios, it provides comprehensive insights into your PostgreSQL environment and allows you to fine-tune and optimize its performance.