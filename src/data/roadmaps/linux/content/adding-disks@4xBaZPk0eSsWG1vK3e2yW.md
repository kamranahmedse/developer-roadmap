# Adding Disks

Adding disks in Linux involves partitioning, creating filesystems, and mounting. Use `lsblk` to list devices, `fdisk /dev/sdX` to create partitions, `mkfs.ext4 /dev/sdX1` to create filesystems, and `mount /dev/sdX1 /mount/point` to mount. This process prepares new storage devices for seamless integration into the Linux filesystem hierarchy.

Visit the following resources to learn more:

- [@article@How to Add a New Disk](https://linuxconfig.org/how-to-add-new-disk-to-existing-linux-system)
- [@article@How to Add a New Disk to an Existing Linux Server](https://www.tecmint.com/add-new-disk-to-an-existing-linux/)