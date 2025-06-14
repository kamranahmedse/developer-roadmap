# Finding and Installing Packages

Linux package managers like `apt`, `yum`, and `dnf` automate software installation, updates, and removal. Use `apt-get update && apt-get install package-name` on Debian/Ubuntu systems or `dnf install package-name` on Fedora/CentOS. Package management eliminates manual compilation from source code and requires appropriate permissions (usually root access).

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