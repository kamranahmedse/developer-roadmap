# Process Monitoring

A process is an instance of a computer program that is being executed. Each process is identified by a unique number called a process ID (PID). A process is a running program. The operating system tracks processes through the use of process identifiers. A process identifier (PID) is a unique number that identifies a specific process. A PID is automatically assigned to each process when it is created on the system.

There are several linux commands that can be used to monitor processes. The most common ones are:

- `ps` - report a snapshot of the current processes.
- `top` - display Linux processes.
- `htop` - interactive process viewer.
- `atop` - advanced interactive monitor to view the load on a Linux system.
- `lsof` - list open files.

The `ps` utility displays a header line, followed by lines containing information about all of your processes that have controlling terminals.

- [ps Documentation](https://man7.org/linux/man-pages/man1/ps.1.html)
- [ps Cheat Sheet](https://www.sysadmin.md/ps-cheatsheet.html)
- [Linux Crash Course - The ps Command](https://www.youtube.com/watch?v=wYwGNgsfN3I)

The `top` program periodically displays a sorted list of system processes. The default sorting key is pid, but other keys can be used instead. Various output options are available.

- [top Documentation](https://man7.org/linux/man-pages/man1/top.1.html)
- [top Cheat Sheet](https://gist.github.com/ericandrewlewis/4983670c508b2f6b181703df43438c37)

htop is a cross-platform ncurses-based process. It is similar to top, but allows you to scroll vertically and horizontally, and interact using a pointing device (mouse). You can observe all processes running on the system, along with their command line arguments, as well as view them in a tree format, select multiple processes and act on them all at once.

- [htop Documentation](https://www.man7.org/linux/man-pages/man1/htop.1.html)
- [htop Cheat Sheet](https://www.maketecheasier.com/power-user-guide-htop/)

Lsof lists on its standard output file information about files opened by processes.

- [lsof Cheat Sheet](https://neverendingsecurity.wordpress.com/2015/04/13/lsof-commands-cheatsheet/)
- [lsof Documentation](https://man7.org/linux/man-pages/man8/lsof.8.html)
- [Linux Crash Course - The lsof Command](https://www.youtube.com/watch?v=n9nZ1ellaV0)