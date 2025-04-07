# Linux Swap under Disks Filesystems

Swap space in Linux is used when the amount of physical memory (RAM) is full. If the system needs more memory resources and the physical memory is full, inactive pages in memory are moved to the swap space. Swap space is a portion of a hard disk drive (HDD) that is used for virtual memory. 

Having swap space ensures that whenever your system runs low on physical memory, it can move some of the data to the swap, freeing up RAM space, but this comes with performance implications as disk-based storage is slower than RAM. 

In the context of disks and filesystems, the swap space can live in two places:

1. In its own dedicated partition.
2. In a regular file within an existing filesystem.

For instance, to add a swap file, we might use the fallocate command to create a certain sized file for swap and the mkswap command to make it suitable for swap usage.

```
fallocate -l 1G /swapfile # creates a swap file
chmod 600 /swapfile # secures the swap file by preventing regular users from reading it
mkswap /swapfile # sets up the Linux swap area
swapon /swapfile # enables the file for swapping
```

Remember that the decision of where to place your swap space, how much swap space to have, and how to utilize swap space are all important considerations in optimizing your system's performance.

- [@article@Swap - Arch Wiki](https://wiki.archlinux.org/title/Swap)
- [@article@zram (alternative) - Arch Wiki](https://wiki.archlinux.org/title/Zram)
