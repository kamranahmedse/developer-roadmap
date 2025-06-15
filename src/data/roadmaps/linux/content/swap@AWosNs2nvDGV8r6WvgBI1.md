# Swap Space

Swap space extends physical memory by using disk storage when RAM is full. Inactive memory pages move to swap, freeing RAM but with performance impact due to slower disk access. Swap can exist as dedicated partitions or regular files. Create with `fallocate`, `mkswap`, and `swapon` commands. Critical for memory management and system stability optimization.

- [@article@Swap - Arch Wiki](https://wiki.archlinux.org/title/Swap)
- [@article@zram (alternative) - Arch Wiki](https://wiki.archlinux.org/title/Zram)
