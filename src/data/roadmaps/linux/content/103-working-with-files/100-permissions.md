# Linux File Permissions

In Linux systems, file and directory permissions are used to control access and determine who can read, write, or execute (run) them. These permissions are assigned to three types of users: the owner, the group, and others.

Proper file permissions are crucial for maintaining system security and preventing unauthorized modifications. Unprivileged users should only have the necessary permissions to perform their tasks, while critical system files and directories should be protected from accidental or malicious changes.

Let's explore an example of file permissions in Ubuntu Linux:

```bash
-rwxr--r-- 1 roadmap root 4096 Jan 1 12:00 filename
```

In this example:

- The first character (`-`) indicates that `filename` is a regular file (not a directory).
- The next three characters (`rwx`) represent the permissions for the file owner (the `roadmap` user).
- The following three characters (`r--`) represent the permissions for the group (the `root` group).
- The last three characters (`r--`) represent the permissions for others (users who are not the owner or part of the group).

The permissions are as follows:

- `r` (read) - The file can be read.
- `w` (write) - The file can be modified.
- `x` (execute) - The file can be executed as a program or script.

You can change the permissions of a file or directory using the `chmod` command. For example, to grant the owner of the `filename` file full permissions, you can run:

```bash
chmod 700 filename
```

This sets the permissions to `rwx` for the owner, and `r-` for the group and others.

To change the owner or group of a file, you can use the `chown` and `chgrp` commands, respectively. For example, to change the owner of `filename` to the `roadmap` user, you can run:

```bash
chown roadmap filename
```

And to change the group of `filename` to the `developers` group, you can run:

```bash
chgrp developers filename
```

Learn more about Linux file permissions from the following resources:

- [@article@Linux File Permissions](https://linuxhandbook.com/linux-file-permissions/)
- [@video@Linux File Permissions in 5 Minutes](https://www.youtube.com/watch?v=LnKoncbQBsM)
- [@article@Linux Permissions of Files](https://labex.io/tutorials/linux-permissions-of-files-270252)
