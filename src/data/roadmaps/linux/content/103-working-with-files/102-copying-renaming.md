# Copying and Renaming Files in Linux

As a Linux user, whether you're a system administrator, developer, or regular user, file management is a crucial daily task. This document will guide you through the essential commands for copying, renaming, and moving files in Linux, using Ubuntu Linux as the example.

## Copying Files

The `cp` command is used to copy files in Linux. The basic syntax is:

```bash
cp /path/to/original/file /path/to/copied/file
```

For example, to copy a file named `roadmap.txt` from the `Documents` directory to the `Downloads` directory on the `roadmap` user's system, you would use the following command:

```bash
cp /home/roadmap/Documents/roadmap.txt /home/roadmap/Downloads/roadmap.txt
```

## Renaming and Moving Files

To rename or move files, you can use the `mv` command. The basic syntax is:

```bash
mv /path/to/original/file /path/to/new/file
```

For instance, to rename the file `roadmap.txt` in the `Documents` directory to `roadmap_updated.txt`, you would use the following command:

```bash
mv /home/roadmap/Documents/roadmap.txt /home/roadmap/Documents/roadmap_updated.txt
```

To move the file `roadmap.txt` from the `Documents` directory to the `Downloads` directory, you would use:

```bash
mv /home/roadmap/Documents/roadmap.txt /home/roadmap/Downloads/roadmap.txt
```

Remember that Linux commands are case-sensitive, so make sure to enter the commands exactly as shown.

For more information, please refer to the following resources:

- [@article@Linux cp Command: File Copying](https://labex.io/tutorials/linux-linux-cp-command-file-copying-209744)
- [@article@Linux mv Command: File Moving and Renaming](https://labex.io/tutorials/linux-linux-mv-command-file-moving-and-renaming-209743)
