# Tail Command 

The `tail` command in Linux is a utility used in text processing. Fundamentally, it's used to output the last part of files. The command reads data from standard input or from a file and outputs the last `N` bytes, lines, blocks, characters, or words to the standard output (or a different file). By default, `tail` returns the last 10 lines of each file to the standard output. This command is common in situations where the user is interested in the most recent entries in a text file, such as log files.

Here are some examples of `tail` command usage:

### Displaying Last 10 Lines 

By default, `tail` displays the last 10 lines of a file. This is particularly useful in checking the most recent system log entries. For instance:

```bash
tail /var/log/syslog
```

### Displaying the Last `N` Lines

To display the last `N` lines of a file, use the `-n` option followed by the number of lines you want to display. For example, to show the last 5 lines of the `/var/log/syslog` file:

```bash
tail -n 5 /var/log/syslog
```

### Displaying the Last `N` Bytes

To display the last `N` bytes of a file, use the `-c` option followed by the number of bytes. This can be particularly useful when you are interested in only the last portion of a file, such as when the file contains binary or compact data. For example, to show the last 100 bytes of the `/var/log/syslog` file:

```bash
tail -c 100 /var/log/syslog
```

### Monitoring File Changes in Real-Time

The `-f` option (follow) allows you to monitor a file for changes in real-time. This is useful for monitoring log files as they are updated. For example:

```bash
tail -f /var/log/syslog
```

This command will output the last 10 lines of the `/var/log/syslog` file and continue to display any new lines added to the file. 
