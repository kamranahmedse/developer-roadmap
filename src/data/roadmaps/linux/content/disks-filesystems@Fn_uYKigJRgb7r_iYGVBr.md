# Disks and Filesystems

Linux uses various filesystems to organize, store, and retrieve data from storage devices. Popular filesystems include EXT4 (robust for Linux volumes), FAT32 (compatible with all OS for removable media), NTFS, and Btrfs. Each has specific advantages and use cases. Use `df -T` command to display filesystem types, disk space usage, and mounted device information.

Here's an example of how to display the type of filesystems of your mounted devices with the "df" command in Linux:

```bash
df -T
```

The output shows the names of your disks, their filesystem types, and other additional information such as total space, used space, and available space on the disks.