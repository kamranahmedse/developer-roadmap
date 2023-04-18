# PgBadger

PgBadger is a PostgreSQL log analyzer built for speed with fully detailed reports from your PostgreSQL log file. It is a powerful open-source tool written in pure Perl language, which makes it compatible with major operating systems like macOS, Windows, and Linux. PgBadger is capable of providing valuable insights to users by parsing log files and generating HTML, CSV, or JSON reports. These features help identify any issue or bottleneck in a PostgreSQL instance.

## Key Features

* Fast log processing
* Incremental log parsing
* Real-time monitoring
* Cross-platform support
* Supports standard and CSV log formats
* Customizable report format (HTML, CSV, or JSON)
* Histograms and charts for visual data representation

## Installation

To install PgBadger, you can download the latest release from [GitHub](https://github.com/darold/pgbadger) and follow the provided instructions or use package managers like `apt` for Debian/Ubuntu or `yum` for CentOS/RHEL based distributions.

```sh
# For Debian/Ubuntu
sudo apt-get install pgbadger

# For CentOS/RHEL
sudo yum install pgbadger
```

## Usage

To use PgBadger, point it to your PostgreSQL log file and specify an output file for the report.

```sh
pgbadger /path/to/postgresql.log -o report.html
```

By default, PgBadger will generate an HTML report. However, you can also choose from other output formats (like CSV or JSON) using the `--format` option.

```sh
pgbadger /path/to/postgresql.log -o report.csv --format csv
```

To incrementally analyze logs and add the results to a single report, use the `--last-parsed` and `--outfile` options.

```sh
pgbadger /path/to/postgresql.log --last-parsed /path/to/last_parsed_ts --outfile /path/to/report.html
```

For real-time monitoring of logs, use the `--daemon` mode with the `--syslog` or `--journalctl` options.

```sh
pgbadger --daemon --interval 60 --outfile /path/to/report.html --syslog postgresql
```

## Conclusion

PgBadger is an incredibly useful tool for analyzing and monitoring PostgreSQL log files. Its wide range of features and compatibility with various platforms make it an invaluable asset to PostgreSQL users. By using PgBadger, you can effectively troubleshoot your PostgreSQL database issues and make data-driven decisions to optimize its performance.