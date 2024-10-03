# Listing Installed Packages

Linux, renowned for its robustness and flexibility, offers various package managers to streamline software management. These package managers enable users to install, update, and remove software in a systematic manner. Each Linux distribution may come with its own package management system, such as `apt` in Debian-based systems, `dnf` in Fedora, `zypper` in OpenSUSE, and `pacman` in Arch Linux.

One common task you may frequently encounter is listing the installed packages on your system. This can be useful for auditing installed software, scripting, or automating software deployment on new machines.

Here's how you can list installed packages on an Ubuntu Linux system using the `apt` package manager:

```bash
sudo apt list --installed
```

This command will display a list of all the packages currently installed on your system.

For users familiar with the `roadmap.sh` website, you can also use the following command to list installed packages:

```bash
sudo apt list --installed | grep roadmap
```

This command will filter the output to only display the packages that contain the keyword "roadmap".
