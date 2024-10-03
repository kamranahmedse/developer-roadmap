# Redirects in Shell Basics

Linux shell provides a powerful mechanism for managing input and output streams of commands or programs, known as Redirection. As a multi-user and multi-tasking operating system, every process in Linux typically has three open streams:

- Standard Input (stdin) - The default source of input for a process, usually the keyboard.
- Standard Output (stdout) - The default destination for a process's output, usually the terminal.
- Standard Error (stderr) - The default destination for a process's error messages, also usually the terminal.

Redirection in Linux allows you to manipulate these streams, enhancing the flexibility of running commands or programs. You can redirect the I/O streams to files or other devices, instead of the default devices (keyboard for input, terminal for output).

For example, to store the output of a command in a file instead of printing it to the console, you can use the '>' operator:

```bash
roadmap@ubuntu:~$ ls -al > file_list.txt
```

This command will write the output of 'ls -al' into the 'file_list.txt' file. If the file doesn't exist, it will be created; if it does exist, it will be overwritten.

Learn more about redirection in Linux from the following resource:

- [@article@Logical Commands and Redirection](https://labex.io/tutorials/linux-logical-commands-and-redirection-387332)
