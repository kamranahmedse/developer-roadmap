# Booting Linux

Linux booting involves several stages: POST, MBR, GRUB, Kernel, Init, and GUI/CLI. The bootloader loads the kernel into memory, which detects hardware, loads drivers, mounts filesystems, starts system processes, and presents login prompts. GRUB configuration is managed through `/etc/default/grub` with settings like timeout and default boot options.

Here is an example of the GRUB configuration file `/etc/default/grub` which is used to configure the GRUB bootloader options:

```bash
GRUB_DEFAULT=0
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR=`lsb_release -i -s 2> /dev/null || echo Debian`
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
GRUB_CMDLINE_LINUX=""
```
This is a basic introduction to booting Linux. However, the specifics may vary depending on the Linux distribution and the specific configurations of your system.