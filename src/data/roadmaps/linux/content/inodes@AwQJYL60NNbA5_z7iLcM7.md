# Inodes

An inode (index node) is a data structure in Linux filesystems that stores metadata about files and directories except their names and actual data. Contains file size, owner, permissions, timestamps, and more. Each file has a unique inode number for identification. Understanding inodes helps with advanced operations like linking and file recovery. Use `ls -i filename` to view inode numbers.

```bash
# Retrieve the inode of a file
ls -i filename
```

Learn more from the following resources:

- [@article@Introduction to Inodes](https://linuxjourney.com/lesson/inodes)
