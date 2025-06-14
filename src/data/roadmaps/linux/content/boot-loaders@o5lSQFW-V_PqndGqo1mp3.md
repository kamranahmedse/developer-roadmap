# Boot Loaders

Boot loaders load the OS kernel into memory when systems start. Common Linux boot loaders include GRUB (modern, feature-rich with graphical interface) and LILO (older, broader hardware support). Boot loaders initialize hardware, load drivers, start schedulers, and execute init processes. Use `sudo update-grub` to update GRUB configuration. Enable multi-OS booting on single machines.

```bash
# This command updates the GRUB bootloader 
sudo update-grub
```

Irrespective of the type of Boot Loader used, understanding and configuring them properly is essential for maintaining an efficient, stable and secure operating system. Boot loaders also allow users to switch between different operating systems on the same machine, if required.

Visit the following resources to learn more:
- [@article@comprehensive documentation of Bootloader - archlinux wiki](https://wiki.archlinux.org/title/Arch_boot_process#Boot_loader)
- [@article@What Is GRUB Bootloader in Linux?](https://phoenixnap.com/kb/what-is-grub)
- [@official@The GNU GRUB website](https://www.gnu.org/software/grub/)

