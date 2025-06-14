# Swap Space

Swap space extends physical memory by using disk storage when RAM is full. Inactive memory pages move to swap, freeing RAM but with performance impact due to slower disk access. Swap can exist as dedicated partitions or regular files. Create with `fallocate`, `mkswap`, and `swapon` commands. Critical for memory management and system stability optimization.

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
