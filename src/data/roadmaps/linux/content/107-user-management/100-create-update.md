# User Management: Create, Update, and Delete Users

Effective user management is crucial for maintaining a secure and organized Linux system environment. This document provides a concise guide on how to create, update, and delete user accounts using the command line interface on Ubuntu Linux.

## Creating Users

To create a new user account, use the `useradd` command. For example, to create a user named "roadmap" with a home directory at `/home/roadmap`, run the following command:

```
sudo useradd -m -d /home/roadmap roadmap
```

The `-m` option creates the user's home directory, and the `-d` option specifies the home directory path.

You can also use the `adduser` command, which provides an interactive interface for creating a new user:

```
sudo adduser roadmap
```

This command will prompt you to enter the new user's details, such as the full name, password, and other optional information.

## Updating User Accounts

To modify an existing user's details, use the `usermod` command. For example, to change the user's login shell to Bash, run:

```
sudo usermod -s /bin/bash roadmap
```

You can also update the user's home directory, groups, or other attributes using the appropriate options with `usermod`.

## Deleting Users

To remove a user account, including the user's home directory and mail spool, use the `userdel` command:

```
sudo userdel -r roadmap
```

The `-r` option ensures that the user's home directory and mail spool are also deleted.

Remember to carefully manage user accounts to maintain a secure and efficient Linux system. For more information, refer to the following resources:

- [@article@How to create, update, and delete users account on Linux](https://linuxconfig.org/how-to-create-modify-and-delete-users-account-on-linux)
- [@article@How to manage users in Linux](https://www.freecodecamp.org/news/how-to-manage-users-in-linux/)
