# Command Path in Shell Basics

In Linux, the command path is an important concept under shell basics. Simply put, command path is a variable that is used by the shell to determine where to look for the executable files to run. Linux commands are nothing but programs residing in particular directories. But, one does not have to navigate to these directories every time to run these programs. The command path comes to the rescue!

Usually, when you type a command in the terminal, the shell needs to know the absolute path of the command's executable to run it. Instead of typing the full path each time, command paths allow the shell to automatically search the indicated directories in the correct order. These paths are stored in the $PATH environment variable.

```sh
echo $PATH
```

Running this command in a Linux terminal will return all the directories that the shell will search, in order, to find the command it has to run. The directories are separated by a colon.

This feature makes using Linux command-line interface convenient and efficient.