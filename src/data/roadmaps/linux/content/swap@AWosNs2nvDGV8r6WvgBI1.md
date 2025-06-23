# Swap Space

Swap space extends physical memory by using disk storage when RAM is full. Inactive memory pages move to swap, freeing RAM but with performance impact due to slower disk access. Swap can exist as dedicated partitions or regular files. Create with `fallocate`, `mkswap`, and `swapon` commands. Critical for memory management and system stability optimization.

Learn more from the following resources:

- [@article@Swap - Arch Wiki](https://wiki.archlinux.org/title/Swap)
- [@article@How to Increase Swap Space on Linux](https://linuxconfig.org/how-to-increase-swap-space-on-linux)