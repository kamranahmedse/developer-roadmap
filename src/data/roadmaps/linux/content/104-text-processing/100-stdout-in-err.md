# Stdout and stderr 

The concepts of stdout and stderr in Linux belong to the fundamentals of Linux text processing. In Linux, when a program is executed, three communication channels are typically opened, namely, STDIN (Standard Input), STDOUT (Standard Output), and STDERR (Standard Error). 

Each of these channels has a specific function. STDOUT is the channel through which the output from most shell commands is sent. STDERR, on the other hand, is used specifically for sending error messages. This distinction is very useful when scripting or programming, as it allows you to handle normal output and error messages in different manners.

Here is an example code snippet showing how these channels are used:

```bash
$ command > stdout.txt 2>stderr.txt
```

In this example, the ">" operator redirects the standard output (stdout) into a text file named stdout.txt, while "2>" redirects the standard error (stderr) into stderr.txt. This way, normal output and error messages are separately stored in distinct files for further examination or processing.