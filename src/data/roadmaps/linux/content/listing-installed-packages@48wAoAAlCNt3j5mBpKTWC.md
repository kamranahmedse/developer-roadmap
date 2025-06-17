# Listing Installed Packages

Linux distributions use different package managers: `apt` (Debian-based), `dnf` (Fedora), `zypper` (OpenSUSE), `pacman` (Arch). Listing installed packages helps with auditing software and deployment automation. Commands: `sudo apt list --installed` for apt systems, `dnf list installed` for dnf systems. Each distribution has its own syntax for this command.

Below is the command for listing installed packages in an `apt` package manager:

```shell
sudo apt list --installed
```

For `dnf` package manager, you would use:

```shell
dnf list installed
```

Remember, different distributions will have their own syntax for this command.