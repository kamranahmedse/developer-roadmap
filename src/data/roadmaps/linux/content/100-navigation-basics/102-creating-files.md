# Creating Files

Linux provides a versatile and powerful command-line interface (CLI) that helps users perform various tasks including file creation and navigation. Learning how to create files is among the fundamental skills for novices venturing into the Linux world. One of the simplest ways to create a file in Linux is with the `touch` command. This command, when supplied with the name of a file as a parameter, either creates a new file with the given name or, if a file with such name is already present, updates the last modified time of the file.

Another useful command for creating files is `cat >filename`. This command creates a new file with the specified name and waits for user input. Hence, the process ends when you press `Ctrl+D` to send `EOF` (End-Of-File) to the `cat` command.

Here's an example of file creation with the `touch` command:

```bash
touch newfile.txt
```

and with `cat` command:

```bash
cat > newfile.txt
```

Both these commands create a new "newfile.txt" if it does not already exist.