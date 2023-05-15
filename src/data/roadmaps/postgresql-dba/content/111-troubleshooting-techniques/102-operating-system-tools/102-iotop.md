# iotop

`iotop` is an essential command-line utility that provides real-time insights into the input/output (I/O) activities of processes running on your system. This tool is particularly useful when monitoring and managing your PostgreSQL database's performance, as it helps system administrators or database developers to identify processes with high I/O, leading to potential bottlenecks or server optimization opportunities.

## Overview

`iotop` operates on the principle of monitoring I/O operations by various processes in real-time. Key features of `iotop` are:

- Displaying statistics for read, write, and swap operations of each process
- Filtering processes based on user or I/O activity
- Sorting processes based on various criteria (e.g., read, write, or total I/O)
- Interactive user interface for controlling columns, sorting criteria, and filter options

## Installation

To install `iotop` on your system, use the following commands depending on your package manager:

```sh
# Debian/Ubuntu
sudo apt-get install iotop

# Fedora
sudo dnf install iotop

# CentOS/RHEL
sudo yum install iotop
```

## Usage

To start using `iotop`, simply run the following command:

```sh
sudo iotop
```

By default, `iotop` will display the top I/O-consuming processes sorted by their current disk usage. The output will include process ID, user, disk read & write speeds, swapin speed, IO %, and command details.

You can control the output using various options like:

- `-o`: Show only processes with I/O activities
- `-b`: Run `iotop` in batch mode (non-interactive)
- `-n <count>`: Number of iterations before exiting
- `-d <seconds>`: Time interval between updates

For example, you can use the following command to display only processes with I/O activities and exit after five iterations with a delay of 3 seconds between each update:

```sh
sudo iotop -o -n 5 -d 3
```

## Additional Resources

- iotop's official website: [http://guichaz.free.fr/iotop/](http://guichaz.free.fr/iotop/)
- Manual page: `man iotop`

In summary, `iotop` is a valuable tool in monitoring and managing I/O activities within your PostgreSQL setup. By using `iotop`, you can make informed decisions about system and database optimizations, ensuring the smooth functioning of your applications.