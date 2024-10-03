# User Management in Linux

The Linux operating system offers a structured user management system, allowing multiple users to interact with the same system in an isolated manner. This includes defining user roles, assigning permissions, groups, ownership, and other related aspects, which are crucial tasks for Linux administrators.

For smoother and controlled operation, user management in Linux involves tasks such as creating, deleting, and modifying users and groups. It also involves assigning permissions and ownership of files and directories to users/groups.

In Ubuntu Linux, you can use the following commands for user management:

- Create a new user:

  ```bash
  sudo adduser roadmap
  ```

  This command will prompt you to enter a password and additional user information.

- Delete a user:

  ```bash
  sudo deluser roadmap
  ```

  This command will remove the user account and their home directory.

- Change a user's password:

  ```bash
  sudo passwd roadmap
  ```

  This command will allow you to change the password for the specified user.

- Switch to a different user:

  ```bash
  su - roadmap
  ```

  This command will switch to the specified user account.

The entire concept of user management circles around providing proper accessibility and maintaining the security of the Linux operating system. Understanding and effectively managing users is a crucial aspect of Linux administration.

For more information, refer to the following resource:

- [@article@User Account Management](https://labex.io/tutorials/linux-user-account-management-49)
