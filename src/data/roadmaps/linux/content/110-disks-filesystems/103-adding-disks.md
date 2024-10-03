# Adding Disks in Linux

In Linux, hard disks and portable drives are managed and controlled through the Linux Filesystem, a series of directories and files. When you add new disks in Linux, you need to prepare them before they can be used.

The process involves creating partitions on the disk, creating a filesystem on the partitions, and then mounting the filesystems to directories in your system's directory tree. This is particularly important when working with multiple disk drives or large data storage units to create a seamless user experience.

Here are the common commands to manage disks in Ubuntu Linux:

- Use `lsblk` to list all block devices (disks and partitions).
- Use `sudo fdisk /dev/sdb` to create a new partition on a disk (replace `/dev/sdb` with your disk identifier).
- Use `sudo mkfs.ext4 /dev/sdb1` to create a new ext4 filesystem on a partition (replace `/dev/sdb1` with your partition identifier).
- Use `sudo mount /dev/sdb1 /roadmap/mnt` to mount a filesystem to a directory (replace `/roadmap/mnt` with your preferred mount point).

```shell
# Example commands to add a new disk
lsblk                         # List all disks and partitions
sudo fdisk /dev/sdb           # Create a new partition on /dev/sdb
sudo mkfs.ext4 /dev/sdb1      # Create an ext4 filesystem on /dev/sdb1
sudo mount /dev/sdb1 /roadmap/mnt  # Mount the new filesystem to /roadmap/mnt
```

Remember to replace the disk and partition identifiers (`/dev/sdb` and `/dev/sdb1`) with your actual disk and partition names. The mount point `/roadmap/mnt` can be replaced with any other directory as per your system's structure and preference.
