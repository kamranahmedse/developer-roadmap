# Moving and Renaming Files in Linux

In Linux, the ability to move and rename files is a fundamental task that you'll frequently encounter. The `mv` command, short for "move," is the go-to tool for this purpose. It allows you to relocate files and directories from one location to another, as well as rename them.

The general syntax for the `mv` command is as follows:

```bash
mv [options] source destination
```

Here, `source` represents the file or directory you want to move, and `destination` is the location where you want to place the file or directory.

Let's explore some practical examples using the `mv` command on Ubuntu Linux:

1. **Moving a File**:

   ```bash
   mv /roadmap/documents/file.txt /roadmap/archives/
   ```

   This command moves the file `file.txt` from the `/roadmap/documents/` directory to the `/roadmap/archives/` directory.

2. **Renaming a File**:

   ```bash
   mv /roadmap/documents/old_file.txt /roadmap/documents/new_file.txt
   ```

   This command renames the file `old_file.txt` to `new_file.txt` within the `/roadmap/documents/` directory.

3. **Moving a Directory**:

   ```bash
   mv /roadmap/projects /roadmap/completed/
   ```

   This command moves the `projects` directory from `/roadmap/` to the `/roadmap/completed/` directory.

The `mv` command is a versatile tool that simplifies file and directory management in Linux. Whether you need to organize your files by moving them into different directories or rename a group of files, the `mv` command is an essential tool in your Linux arsenal.

For more information, refer to the following resource:

- [@article@Linux mv Command: File Moving and Renaming](https://labex.io/tutorials/linux-linux-mv-command-file-moving-and-renaming-209743)
