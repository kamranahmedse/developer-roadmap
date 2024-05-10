# User Management: Create and Update Users 

User management is an essential part of maintaining a Linux system. It consists of managing user accounts and groups, and setting permissions for them. Linux system administrators should be proficient in creating, updating and managing users to ensure system security as well as efficient use of system resources.

When creating a new user, we add a new record in the system files for that user along with other details like home directory, login shell, and password. We can create new users with ‘useradd’ or 'adduser' commands. For instance, to create a new user, you might use a command like:

```bash
sudo useradd newuser
```

On the other hand, updating a user means modifying user details. It may include changing display or user name, home directory or login shell. The 'usermod' command is used for updating a user in Linux. For instance, to change the home directory for a user, you might use a command like: 

```bash
sudo usermod -d /new/home/directory username
```

Managing users effectively is crucial in Linux for both system security and resource management. You can fully harness the power of Linux's multi-user characteristics through skillful user management.