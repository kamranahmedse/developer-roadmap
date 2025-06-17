# Adding Disks

Adding disks in Linux involves partitioning, creating filesystems, and mounting. Use `lsblk` to list devices, `fdisk /dev/sdX` to create partitions, `mkfs.ext4 /dev/sdX1` to create filesystems, and `mount /dev/sdX1 /mount/point` to mount. This process prepares new storage devices for seamless integration into the Linux filesystem hierarchy.