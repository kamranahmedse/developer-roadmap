# User Management: Create, Update, and Delete Users

User management is an essential part of maintaining a Linux system. It consists of managing user accounts and groups, and setting permissions for them. Linux system administrators should be proficient in creating, updating, and managing users to ensure system security as well as efficient use of system resources.

## Creating a New User

When creating a new user, we add a new record in the system files for that user along with other details like home directory, login shell, and password. We can create new users with the `useradd` or `adduser` commands. For instance, to create a new user, you might use a command like:

```bash
sudo useradd newuser
```

## Updating a User

Updating a user means modifying user details. It may include changing the display or username, home directory, or login shell. The `usermod` command is used for updating a user in Linux. For instance, to change the home directory for a user, you might use a command like:

```bash
sudo usermod -d /new/home/directory username
```

## Deleting a User

Deleting a user involves removing the user account and optionally the user's home directory and mail spool. The `userdel` command is used for deleting a user in Linux. For instance, to delete a user, you might use a command like:

```bash
sudo userdel username
```

Managing users effectively is crucial in Linux for both system security and resource management. You can fully harness the power of Linux's multi-user characteristics through skillful user management.

- [@article@How to create user in Linux](https://www.geeksforgeeks.org/useradd-command-in-linux-with-examples)
- [@article@How to modify user in Linux](https://www.geeksforgeeks.org/usermod-command-in-linux-with-examples)
- [@article@How to delete user in Linux](https://www.geeksforgeeks.org/userdel-command-in-linux-with-examples)