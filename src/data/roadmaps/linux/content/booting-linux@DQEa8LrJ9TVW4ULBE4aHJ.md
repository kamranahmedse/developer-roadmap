# Booting Linux

Linux booting involves several stages: POST, MBR, GRUB, Kernel, Init, and GUI/CLI. The bootloader loads the kernel into memory, which detects hardware, loads drivers, mounts filesystems, starts system processes, and presents login prompts. GRUB configuration is managed through `/etc/default/grub` with settings like timeout and default boot options.

Visit the following resources to learn more:

- [@official@The GNU GRUB](https://www.gnu.org/software/grub/)
- [@article@Booting process of Linux - Wikipedia](https://en.wikipedia.org/wiki/Booting_process_of_Linux)
- [@article@The Linux Booting Process](https://thelinuxcode.com/the-linux-booting-process-6-steps-described-in-detail/)