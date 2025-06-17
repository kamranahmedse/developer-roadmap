# Stdout, Stdin, and Stderr

Linux processes use three standard data streams: STDIN (input), STDOUT (output), and STDERR (error messages). STDOUT handles normal command output while STDERR specifically handles error messages. You can redirect these streams using operators like `>` for stdout and `2>` for stderr, allowing separate handling of normal output and errors for better scripting and debugging.

Here is an example code snippet showing how these channels are used:

```bash
$ command > stdout.txt 2>stderr.txt
```

In this example, the ">" operator redirects the standard output (stdout) into a text file named stdout.txt, while "2>" redirects the standard error (stderr) into stderr.txt. This way, normal output and error messages are separately stored in distinct files for further examination or processing.