# Inodes 

In a Linux filesystem, an inode (index node) is a core concept that represents a filesystem object such as a file or a directory. More specifically, an inode is a data structure that stores critical information about a file except its name and actual data. This information includes the file's size, owner, access permissions, access times, and more. 

Every file or directory in a Linux filesystem has a unique inode, and each inode is identified by an inode number within its own filesystem. This inode number provides a way of tracking each file, acting as a unique identifier for the Linux operating system.

Whenever a file is created in Linux, it is automatically assigned an inode that stores its metadata. The structure and storage of inodes are handled by the filesystem, which means the kind and amount of metadata in an inode can differ between filesystems.

Although you would not interact with inodes directly in everyday usage, understanding inodes can be very helpful when dealing with advanced file operations, such as creating links or recovering deleted files.

```bash
# Retrieve the inode of a file
ls -i filename
```
