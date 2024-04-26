# Adding Disks

In Linux, hard disks and portable drives are managed and controlled through a series of directories and files, commonly referred to as the Linux Filesystem. When you add new disks in Linux, you need to prepare them before they can be used.

The process involves creating partitions on the disk, creating filesystem on the partitions, and then mounting the filesystems to directories in your system’s directory tree. This becomes important especially when working with multiple disk drives or large data storage units in order to create a seamless user experience.

The following are common commands to manage disks:

- Use `lsblk` to list all block devices (disk and partitions).
- Use `fdisk /dev/sdX` to create a new partition on a disk.
- Use `mkfs.ext4 /dev/sdX1` to create a new filesystem on a partition.
- Use `mount /dev/sdX1 /mount/point` to mount a filesystem to a directory.

```shell
# example commands to add new disk
lsblk                     # list all disks and partitions
sudo fdisk /dev/sdb       # let's suppose new disk is /dev/sdb
sudo mkfs.ext4 /dev/sdb1  # make filesystem(e.g., ext4) on partition 1
sudo mount /dev/sdb1 /mnt # mount new filesystem to /mnt directory
``` 

Remember to replace `/dev/sdb` and `/dev/sdb1` with your actual disk and partition identifiers. The mount point `/mnt` may also be replaced with any other directory as per your system's structure and preference.