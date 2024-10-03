# Linux Disks and Filesystems

In the Linux operating system, various filesystems are used to organize, store, and retrieve data on storage devices such as disks. These filesystems define the structure and management of data on these storage media. Some of the popular Linux filesystems include EXT4, FAT32, NTFS, and Btrfs, each with its own advantages, disadvantages, and use cases.

EXT4 (Fourth Extended Filesystem) is a widely-used filesystem for Linux system volumes due to its robustness, reliability, and compatibility with the Linux operating system. It offers features like journaling, extended attributes, and large file and partition support.

FAT32 (File Allocation Table 32-bit) is often used for removable media like USB drives, as it provides compatibility with a wide range of operating systems, including Linux, Windows, and macOS.

To display the filesystem types of your mounted devices in Ubuntu Linux, you can use the `df` command with the `-T` option:

```bash
roadmap@ubuntu:~$ df -T
Filesystem     Type     1K-blocks     Used Available Use% Mounted on
udev           devtmpfs   2000084        0   2000084   0% /dev
tmpfs          tmpfs       402032     1120    400912   1% /run
/dev/sda2      ext4      49711468 10229180  37221464  22% /
tmpfs          tmpfs      2010160        0   2010160   0% /dev/shm
tmpfs          tmpfs        40320        0     40320   0% /run/lock
tmpfs          tmpfs      2010160        0   2010160   0% /sys/fs/cgroup
/dev/sda1      vfat        523248     5120    518128   2% /boot/efi
tmpfs          tmpfs       402032        0    402032   0% /run/user/1000
```

This command displays the filesystem type (`Type` column) for each mounted device on your system, providing valuable information about the storage configurations.
