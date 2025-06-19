# Stdout, Stdin, and Stderr

Linux processes use three standard data streams: STDIN (input), STDOUT (output), and STDERR (error messages). STDOUT handles normal command output while STDERR specifically handles error messages. You can redirect these streams using operators like `>` for stdout and `2>` for stderr, allowing separate handling of normal output and errors for better scripting and debugging.

Learn more from the following resources:

- [@article@Linux Fundamentals - I/O, Standard Streams, and Redirection](https://www.putorius.net/linux-io-file-descriptors-and-redirection.html)
- [@article@Understanding 'stdin', 'stdout' and 'stderr' in Linux](https://www.slingacademy.com/article/understanding-stdin-stdout-and-stderr-in-linux/)
- [@article@Working with data streams on the Linux command line](https://opensource.com/article/18/10/linux-data-streams)