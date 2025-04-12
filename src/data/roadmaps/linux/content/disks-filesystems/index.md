# Linux Disks Filesystems

Linux uses a variety of filesystems to allow us to store and retrieve data from the hardware of a computer system such as disks. The filesystem defines how data is organized, stored, and retrieved on these storage devices. Examples of popular Linux filesystems include EXT4, FAT32, NTFS, and Btrfs. 

Each filesystem has its own advantages, disadvantages, and use cases. For example, EXT4 is typically used for Linux system volumes due to its robustness and compatibility with Linux, while FAT32 may be used for removable media like USB drives for its compatibility with almost all operating systems. 

Here's an example of how to display the type of filesystems of your mounted devices with the "df" command in Linux:

```bash
df -T
```

The output shows the names of your disks, their filesystem types, and other additional information such as total space, used space, and available space on the disks.