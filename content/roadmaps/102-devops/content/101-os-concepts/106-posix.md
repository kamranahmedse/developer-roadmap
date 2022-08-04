# POSIX Basics

POSIX (Portable Operating System Interface) is a family of standards for maintaining compatibility between operating systems. It describes utilities, APIs, and services that a compliant OS should provide to software, thus making it easier to port programs from one system to another.

A practical example: in a Unix-like operating system, there are three *standard streams*, `stdin`, `stdout` and `stderr` - they are I/O connections that you will probably come across when using a terminal, as they manage the flow from the **standard input** (stdin), **standard output** (stdout) and **standard error** (stderr).

So, in this case, when we want to interact with any of these streams (through a process, for example), the POSIX operating system API makes it easier - for example, in the `<unistd.h>` C header where the stdin, stderr, and stdout are defined as `STDIN_FILENO`, `STDERR_FILENO` and `STDOUT_FILENO`.

POSIX also adds a standard for exit codes, filesystem semantics, and several other command line utility API conventions.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='blue' badgeText='Read' href='https://unix.stackexchange.com/a/220877'>Summary of some POSIX implementations</BadgeLink>
<BadgeLink colorScheme='blue' badgeText='Read' href='https://www.baeldung.com/linux/posix'>A guide to POSIX</BadgeLink>
<BadgeLink colorScheme='blue' badgeText='Documentation' href='https://pubs.opengroup.org/onlinepubs/9699919799/'>POSIX standard by IEEE</BadgeLink>
