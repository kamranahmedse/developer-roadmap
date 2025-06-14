# Adding Disks

Adding disks in Linux involves partitioning, creating filesystems, and mounting. Use `lsblk` to list devices, `fdisk /dev/sdX` to create partitions, `mkfs.ext4 /dev/sdX1` to create filesystems, and `mount /dev/sdX1 /mount/point` to mount. This process prepares new storage devices for seamless integration into the Linux filesystem hierarchy.

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