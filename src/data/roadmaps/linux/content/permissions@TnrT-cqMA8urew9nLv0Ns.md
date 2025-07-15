# Linux File Permissions

In Linux systems, rights and privileges are assigned to files and directories in the form of permissions. These permissions indicate who can read, write, or execute (run) them. In Linux, there are three types of users: owners, groups, and others who can have a different set of permissions.

In fact, permissions on the system are there for a reason: to prevent unprivileged users from making changes on the system that would ultimately affect other users. With inadequate permissions, unprivileged users are able to make changes that would be beneficial or harmless to the Linux system.

Let's have a look at an example:

```bash
-rwxr--r-- 1 root root 4096 Jan 1 12:00 filename
```

From the above example, the first character `-` indicates if it is a regular file(`-`) or directory(`d`). The following group of three characters(`rwx`) represents the permissions for the file owner. The next three characters(`r--`) represent permissions for the group and the last set of three characters(`r--`) represents permissions for others.

The `r` indicates that the file can be read, `w` indicates that the file can be written to, and `x` indicates that the file can be executed.

The permissions can be changed using the `chmod`, `chown`, and `chgrp` commands.

Learn more from the following resources:

- [@article@Linux File Permissions](https://linuxhandbook.com/linux-file-permissions/)
- [@video@Linux File Permissions in 5 Minutes](https://www.youtube.com/watch?v=LnKoncbQBsM)
- [@article@Linux Permissions of Files](https://labex.io/tutorials/linux-permissions-of-files-270252)