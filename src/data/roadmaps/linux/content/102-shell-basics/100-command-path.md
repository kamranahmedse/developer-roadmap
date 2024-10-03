# Command Path in Shell Basics

In Linux, the command path is a crucial concept in shell basics. It's a variable that the shell uses to determine where to look for executable files to run. Linux commands are programs stored in specific directories, but you don't have to navigate to those directories every time you want to run them. The command path comes to the rescue!

When you type a command in the terminal, the shell needs to know the absolute path of the command's executable to run it. Instead of typing the full path each time, command paths allow the shell to automatically search the indicated directories in the correct order. These paths are stored in the `$PATH` environment variable.

To view the directories in your `$PATH`, you can run the following command in a Linux terminal (e.g., Ubuntu Linux):

```bash
echo $PATH
```

This will return all the directories that the shell will search, in order, to find the command it has to run. The directories are separated by a colon.

This feature makes using the Linux command-line interface convenient and efficient. For example, if you have a script named `roadmap-script.sh` in the `/home/roadmap/bin` directory, you can add this directory to your `$PATH` to run the script from anywhere in the terminal:

```bash
export PATH="/home/roadmap/bin:$PATH"
roadmap-script.sh
```

By adding the directory to the `$PATH`, the shell can now find and execute the `roadmap-script.sh` script without you having to navigate to the `/home/roadmap/bin` directory.
