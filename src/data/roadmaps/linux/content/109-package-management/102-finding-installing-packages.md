# Finding and Installing Packages

The ability to efficiently find and install software packages is a fundamental skill when working with Linux based systems. Linux package management tools such as `apt`, `yum`, or `dnf` are used to automate the process of installing, upgrading, configuring, and removing software packages in a consistent manner. 

It's important to understand how package management works in Linux, because it significantly simplifies the process of software management, eliminating the need to manually download, compile, and install software from source code.

For example, on a Debian-based system like Ubuntu you would use `apt` or `apt-get` to install a new package like so:

```
sudo apt-get update
sudo apt-get install package-name
```

While in a Fedora or CentOS you would use `dnf` or `yum`:

```
sudo dnf update
sudo dnf install package-name
```

Note that you should replace `package-name` with the name of the package you want to install. Remember that you will need appropriate permissions (often root) to install packages in a Linux system.