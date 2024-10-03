# User Management: Managing Permissions

In Linux, user management involves controlling access and permissions to files and directories. Permissions are categorized into read, write, and execute types, and can be set for the file owner (user), the owning group, and others. Commands like `chmod`, `chown`, and `chgrp` are used to view and manipulate these permissions. Proper permission management is crucial for maintaining system security and organization.

Here's an example of managing permissions on Ubuntu Linux:

1. **View file permissions**:

   ```
   $ ls -l /home/roadmap/file.txt
   -rw-r--r-- 1 roadmap roadmap 0 Apr 12 12:34 /home/roadmap/file.txt
   ```

   The permissions are displayed as a string of 10 characters, where the first character indicates the file type (`-` for regular file, `d` for directory), and the next 9 characters represent the read, write, and execute permissions for the owner, group, and others.

2. **Change file permissions**:

   ```
   $ chmod 644 /home/roadmap/file.txt
   $ ls -l /home/roadmap/file.txt
   -rw-r--r-- 1 roadmap roadmap 0 Apr 12 12:34 /home/roadmap/file.txt
   ```

   The `chmod` command is used to change the permissions. The number `644` represents the permissions: the owner has read and write permissions, the group and others have read-only permissions.

3. **Change file ownership**:

   ```
   $ chown roadmap:roadmap /home/roadmap/file.txt
   $ ls -l /home/roadmap/file.txt
   -rw-r--r-- 1 roadmap roadmap 0 Apr 12 12:34 /home/roadmap/file.txt
   ```

   The `chown` command is used to change the owner and group of a file. In this example, the file is owned by the `roadmap` user and the `roadmap` group.

For more detailed information, refer to the following resources:

- [@article@Linux file permissions explained](https://www.redhat.com/sysadmin/linux-file-permissions-explained)
- [@video@Linux file permissions in 5 minutes](https://www.youtube.com/watch?v=LnKoncbQBsM)
