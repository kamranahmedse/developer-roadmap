# Linux: Permissions Under User Management

Linux, like all Unix-like systems, is a multi-user system, meaning it can be used by multiple users at one time. As such, it has a comprehensive system for managing permissions for these users. These Linux permissions dictate who can access, modify, and execute files and directories.

Permissions are categorized into three types:

1. **Read permission**: Users with read permissions can view the contents of the file.

2. **Write permission**: Users with write permissions can modify the contents of the file or directory.

3. **Execute permission**: Users with execute permissions can run a file or traverse a directory.

These permissions can be set for three kinds of entities: 

1. **User**: The owner of the file or directory.

2. **Group**: The user group that owns the file or directory.

3. **Others**: Other users who are neither the owner of the file, nor belong to the group that owns the file.

To set these permissions, Linux uses a system of permission bits. This information can be viewed and manipulated using commands such as `chmod`, `chown`, and `chgrp`.

```bash
chmod 755 my_file
chown new_owner my_file
chgrp new_group my_file
```

In the example above, `chmod 755 my_file` sets permissions so that the user can read, write, and execute (7), while the group and others can read and execute (5). The `chown` and `chgrp` commands change the owner and group of `my_file`, respectively.