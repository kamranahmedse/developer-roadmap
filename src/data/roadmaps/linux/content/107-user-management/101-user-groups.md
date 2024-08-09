# User Management: Users & Groups

In Linux, a User Group is a mechanism used to manage the system’s users and permissions. It represents a collection of users, designed specifically to simplify system administration. Each user in Linux is a part of one or more groups. These groups are primarily used for determining access rights to various system resources, including files, directories, devices, etc.

Understanding and appropriately managing user groups in Linux is crucial for overall system security. It allows the administrator to grant certain privileges to a specific set of users, without granting them complete superuser or 'root' access.

## Checking User Group Affiliations

One can check a user’s group affiliations using the `groups` command, while the `/etc/group` file contains a list of all groups on the system.

```bash
groups [username]
cat /etc/group
```

## Managing User Groups

At times, it becomes necessary to add or remove users from groups, modify group properties, or even create and delete groups altogether. These operations can typically be performed using the following commands:

- `groupadd`: Create a new group.
- `groupdel`: Delete an existing group.
- `groupmod`: Modify an existing group.
- `usermod`: Modify a user's group affiliations.
- `gpasswd`: Administer `/etc/group` and `/etc/gshadow`.

## Importance of User Groups

Overall, user groups are an essential component of Linux User Management, helping to maintain a secure and organized system environment.

- [@article@How to create, delete, and modify groups in Linux](https://www.redhat.com/sysadmin/linux-groups)
- [@article@How to manage groups on Linux](https://linuxconfig.org/how-to-manage-groups-on-linux)