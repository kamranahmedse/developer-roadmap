# Listing Installed Packages 

Linux, known for its robustness and flexibility, provides several package managers that aid in software management. These package managers help us to install, update, or remove software in a systematic way. Each Linux distribution may come with its own package management system. Examples include `apt` in Debian-based systems, `dnf` in Fedora, `zypper` in OpenSUSE, and `pacman` in Arch Linux.

One common task you may often need is listing installed packages in your system. This task can help in various scenarios like auditing installed software, scripting or automating deployment of software on new machines.

Below is the command for listing installed packages in an `apt` package manager:

```shell
sudo apt list --installed
```

For `dnf` package manager, you would use:

```shell
dnf list installed
```

Remember, different distributions will have their own syntax for this command.