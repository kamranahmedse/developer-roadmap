# User Management: Users & Groups

User management in Linux uses user groups to manage system users and permissions efficiently. A user group is a collection of users that simplifies system administration by determining access rights to resources like files and directories. Each user belongs to one or more groups, allowing administrators to grant specific privileges without full superuser access. Commands like `groupadd`, `groupdel`, `groupmod`, `usermod`, and `gpasswd` are used to manage groups. Proper group management is crucial for a secure and organized system environment. For detailed instructions, refer to resources on managing Linux groups.

Learn more from the following resources:

- [@article@How to create, delete, and modify groups in Linux](https://www.redhat.com/sysadmin/linux-groups)
- [@article@How to manage groups on Linux](https://linuxconfig.org/how-to-manage-groups-on-linux)

# Linux User and Group Management Commands

## Adding a New Group
To create a new group:
```bash
sudo groupadd newgroup
```

## Deleting a Group
To remove a group:
```bash
sudo groupdel oldgroup
```

## Modifying a Group
To change the name of a group:
```bash
sudo groupmod -n newgroupname oldgroupname
```

## Adding a User to a Group
To add an existing user to a group:
```bash
sudo usermod -aG groupname username
```
- `-aG`: Appends the user to the group without removing them from other groups.

## Removing a User from a Group
To remove a user from a specific group:
```bash
sudo gpasswd -d username groupname
```

## Changing a User's Primary Group
To modify a user's primary group:
```bash
sudo usermod -g groupname username
```

## Creating a New User
To create a new user:
```bash
sudo adduser newuser
```

## Deleting a User
To delete a user:
```bash
sudo deluser username
```
Or using the alternative command:
```bash
sudo userdel username
```

## Deleting a User and Their Home Directory
To delete a user along with their home directory:
```bash
sudo deluser --remove-home username
```
Or:
```bash
sudo userdel -r username
```

## Locking a User Account
To lock a user's account:
```bash
sudo usermod -L username
```

## Unlocking a User Account
To unlock a user's account:
```bash
sudo usermod -U username
```

## Changing a Group's Password
To set or change a group password:
```bash
sudo gpasswd groupname
```

## Examples in Action
### Create a Group and Add a User
```bash
sudo groupadd developers
sudo usermod -aG developers john
```

### Rename a Group
```bash
sudo groupmod -n engineers developers
```

### Remove a User from a Group
```bash
sudo gpasswd -d john engineers
```

### Delete a Group
```bash
sudo groupdel engineers
