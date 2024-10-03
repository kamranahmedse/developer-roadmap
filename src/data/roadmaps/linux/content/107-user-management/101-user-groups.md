# User Management: Users & Groups

Linux user management efficiently organizes system users and permissions through user groups. A user group is a collection of users that simplifies administration by granting specific access rights to resources like files and directories. Each user belongs to one or more groups, allowing administrators to manage privileges without full superuser access. Commands like `groupadd`, `groupdel`, `groupmod`, `usermod`, and `gpasswd` are used to manage groups. Proper group management is crucial for a secure and organized system environment.

Here's how to manage users and groups on Ubuntu Linux:

**Creating a Group**
To create a new group, use the `groupadd` command:

```
sudo groupadd roadmap_users
```

This creates a new group called `roadmap_users`.

**Adding a User to a Group**
To add a user to a group, use the `usermod` command:

```
sudo usermod -aG roadmap_users roadmap
```

This adds the user `roadmap` to the `roadmap_users` group.

**Removing a User from a Group**
To remove a user from a group, use the `gpasswd` command:

```
sudo gpasswd -d roadmap roadmap_users
```

This removes the user `roadmap` from the `roadmap_users` group.

**Deleting a Group**
To delete a group, use the `groupdel` command:

```
sudo groupdel roadmap_users
```

This deletes the `roadmap_users` group.

For more information, refer to the following resources:

- [@article@How to create, delete, and modify groups in Linux](https://www.redhat.com/sysadmin/linux-groups)
- [@article@How to manage groups on Linux](https://linuxconfig.org/how-to-manage-groups-on-linux)
