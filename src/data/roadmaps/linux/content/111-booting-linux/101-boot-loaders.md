# Boot Loaders 

Boot Loaders play an integral role in booting up any Linux-based system. When the system is switched on, it's the Boot Loader that takes charge and loads the kernel of the OS into the system’s memory. The kernel then initializes the hardware components and loads necessary drivers, after which it starts the scheduler and executes the init process.

Typically, the two most commonly used boot loaders in Linux are LILO (Linux Loader) and GRUB (GRand Unified Bootloader). GRUB sets the standard for modern day Linux booting, providing rich features like a graphical interface, scripting, and debugging capabilities. LILO, on the other hand, is older and does not have as many features, but runs on a broader range of hardware platforms.

```bash
# This command updates the GRUB bootloader 
sudo update-grub
```

## Example Command of Installing GRUB Bootloader on a *NEW* Operating System 
> [!WARNING]
> Don't run this command unless instructed to! Running this command _**incorrectly**_ can make your system unbootable.
> This command is typically used after installing a new operating system or making significant changes to the boot configuration.
```bash
# This command installs the GRUB bootloader on a 64-bit EFI(Extensible Firmware Interface) system, placing it in the /boot directory and setting the bootloader ID to "GRUB".
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
```

Irrespective of the type of Boot Loader used, understanding and configuring them properly is essential for maintaining an efficient, stable and secure operating system. Boot loaders also allow users to switch between different operating systems on the same machine, if required.

Visit the following resources to learn more:
- [@article@comprehensive documentation of Bootloader - archlinux wiki](https://wiki.archlinux.org/title/Arch_boot_process#Boot_loader)
- [@article@What Is GRUB Bootloader in Linux?](https://phoenixnap.com/kb/what-is-grub)
- [@official@The GNU GRUB website](https://www.gnu.org/software/grub/)

