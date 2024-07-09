# pgCluu

PgCluu is a powerful and easy-to-use PostgreSQL performance monitoring and tuning tool. This open-source program collects statistics and provides various metrics in order to analyze PostgreSQL databases, helping you discover performance bottlenecks and optimize your cluster's performance.

## Key Features

- Collects and analyzes PostgreSQL log files and system statistics.
- Provides real-time monitoring and reports with insights into various aspects, such as queries, locks, indexes, tablespaces, connections, and more.
- Offers customizable graphs for visualizing performance data.

## Installation and Usage

To install PgCluu, follow these steps:

- Install the required dependencies:
   ```bash
   sudo apt-get install perl libdbi-perl libdbd-pg-perl libpg-perl libjson-perl rrdtool librrds-perl
   ```
- Download and extract the latest PgCluu release from [the official GitHub repository](https://github.com/darold/pgcluu/releases):
   ```bash
   wget https://github.com/darold/pgcluu/archive/refs/tags/v3.1.tar.gz
   tar xzf v3.1.tar.gz
   ```
- Run the PgCluu collector to collect statistics:
   ```bash
   cd pgcluu-3.1/bin
   ./pgcluu_collectd -D /path/to/output_directory -S [interval_seconds] -W [history_days] -C /path/to/pgcluu.conf
   ```
- Generate the report using the collected data:
   ```bash
   ./pgcluu -o /path/to/report_directory /path/to/output_directory
   ```
- Serve the report using a web server or browse the generated HTML files directly.

## Configuration

Before running the PgCluu collector (`pgcluu_collectd`), you can configure the `pgcluu.conf` file by providing the appropriate values for your PostgreSQL cluster, such as hostname, port number, database name, and login credentials.

Apart from PostgreSQL-specific settings, you can also tweak other options, such as the RRDtool's data file format (JPG or SVG), time range for graphs, and more.