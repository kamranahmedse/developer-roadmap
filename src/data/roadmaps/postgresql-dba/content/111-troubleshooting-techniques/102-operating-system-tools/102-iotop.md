# iotop

## iotop

`iotop` is an essential command-line utility that allows you to monitor the input/output (I/O) operations of your PostgreSQL database system. It displays real-time information on the I/O usage of each process, helping you to identify potential bottlenecks or resource-intensive tasks.

### Installation

`iotop` is not included by default on most Linux distributions, but can be easily installed using the package manager:

- For Debian/Ubuntu: `sudo apt-get install iotop`
- For Red Hat/CentOS: `sudo yum install iotop`
- For Fedora: `sudo dnf install iotop`

### Usage

To run `iotop`, simply enter the command in your terminal:
```
sudo iotop
```

By default, it will display a table with several columns showing information on the processes that are currently performing I/O operations. The most relevant columns for a PostgreSQL DBA are:

- **PRIO**: The I/O priority of the process;
- **USER**: The user running the process;
- **DISK READ and DISK WRITE**: The current read and write speed of the process;
- **COMMAND**: The command being executed by the process.

You can also display accumulated I/O by adding the `-a` option:
```
sudo iotop -a
```

### Tips and Tricks

- To show only the PostgreSQL processes, you can run:
```
sudo iotop -P | grep 'postgres'
```

- To refresh the display every `x` seconds, you can use the `-d` option:
```
sudo iotop -d x
```

- To limit the number of iterations, you can use the `-n` option:
```
sudo iotop -n x
```

By using `iotop`, DBAs can monitor the I/O activities of their PostgreSQL database system, which can help to optimize the performance and identify potential issues related to disk access.