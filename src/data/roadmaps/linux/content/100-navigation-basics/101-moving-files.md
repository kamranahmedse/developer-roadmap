# Moving Files 

In Linux, moving files is an essential task that you will need to perform quite frequently. The `mv` command, short for move, is used to move files and directories from one location to another. The `mv` command can also be used for renaming files in Linux.

The general syntax for the `mv` command is as follows:

```bash
mv [options] source destination
```

Here, `source` denotes the file or directory that you want to move while `destination` denotes the location where you want to move your source file or directory. 

The `mv` command is widely used because of its simplicity and versatility. Whether you want to organize your files by moving them into different directories or rename a bunch of files, the `mv` command is your go-to tool in Linux.

Examples
To rename a file, enter:
```bash
mv appendix apndx.a
```
This command renames appendix to apndx.a. If a file named apndx.a already exists, its old contents are replaced with those of appendix.
To move a directory, enter:
```bash
mv book manual
```
This command moves all files and directories under book to the directory named manual, if manual exists. Otherwise, the directory book is renamed manual.
To move a file to another directory and give it a new name, enter:
```bash
mv intro manual/chap1
```
This command moves intro to manual/chap1. The name intro is removed from the current directory, and the same file appears as chap1 in the directory manual.
To move a file to another directory, keeping the same name, enter:
```bash
mv chap3 manual
```
This command moves chap3 to manual/chap3
Note: Examples 1 and 3 name two files, example 2 names two existing directories, and example 4 names a file and a directory.
To move several files into another directory, enter:
```bash
mv chap4 jim/chap5 /home/manual
```
This command moves the chap4 file to the /home/manual/chap4 file directory and the jim/chap5 file to the /home/manual/chap5 file.
To use the mv command with pattern-matching characters, enter:
```bash
mv manual/* .
```
This command moves all files in the manual directory into the current directory . (period), retaining the names they had in manual. This move also empties manual. You must type a space between the asterisk and the period.
Note: Pattern-matching characters expand names of existing files only. For example, the command mv intro man*/chap1 does not work if the file manual/chap1 does not exist.
