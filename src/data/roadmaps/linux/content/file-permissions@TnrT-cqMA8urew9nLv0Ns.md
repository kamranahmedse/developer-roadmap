# File Permissions

Linux file permissions control who can read (r), write (w), or execute (x) files and directories. Permissions are set for owner, group, and others using octal notation or symbolic format. The format `-rwxr--r--` shows file type and permissions. Use `chmod` to change permissions, `chown` for ownership, and `chgrp` for group ownership. Proper permissions ensure system security.

Let's have a look at an example:

```bash
-rwxr--r-- 1 root root 4096 Jan 1 12:00 filename
```

From the above example, the first character `-` indicates if it is a regular file(`-`) or directory(`d`). The following group of three characters(`rwx`) represents the permissions for the file owner. The next three characters(`r--`) represent permissions for the group and the last set of three characters(`r--`) represents permissions for others.

The `r` indicates that the file can be read, `w` indicates that the file can be written to, and `x` indicates that the file can be executed.

Learn more from the following resources:

- [@article@Linux File Permissions](https://linuxhandbook.com/linux-file-permissions/)
- [@video@Linux File Permissions in 5 Minutes](https://www.youtube.com/watch?v=LnKoncbQBsM)
- [@article@Linux Permissions of Files](https://labex.io/tutorials/linux-permissions-of-files-270252)