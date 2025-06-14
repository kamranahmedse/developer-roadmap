# Disks and Filesystems

Linux supports various filesystems like EXT4, FAT32, NTFS, and Btrfs for organizing data on storage devices. Each filesystem has specific advantages - EXT4 for Linux systems, FAT32 for compatibility across operating systems. The `df -T` command displays mounted filesystems with their types, sizes, and available space information. 

Here's an example of how to display the type of filesystems of your mounted devices with the "df" command in Linux:

```bash
df -T
```

The output shows the names of your disks, their filesystem types, and other additional information such as total space, used space, and available space on the disks.