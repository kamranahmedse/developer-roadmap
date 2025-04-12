# Filesystems

Linux operating system provides multiple ways to handle the data storage through the concept of filesystems under disks. Filesystems, in essence, is the way how files are stored and organized on the storage disk. It's a critical component of the system as it ensures the integrity, reliability and efficient access to the data.

A disk installed in a Linux system can be divided into multiple partitions, each with its own filesystem. Linux supports various types of filesystems, such as EXT4, XFS, BTRFS, etc. Each one of them has their own advantages regarding performance, data integrity and recovery options. 

Configuration of these filesystems relies on a defined hierarchical structure. All the files and directories start from the root directory, presented by '/'.

Understanding the concept and management of filesystems is key for the successful administration of Linux systems, as it involves routine tasks like mounting/unmounting drives, checking disk space, managing file permissions, and repairing corrupted filesystems.

Code snippet to display the file system in Linux:
```bash
df -T
```
This command will display the type of filesystem, along with the disk usage status.