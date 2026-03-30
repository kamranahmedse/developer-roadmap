# Package Managers

Package managers are tools used to install, update, and manage software packages on Linux systems. Since most Docker images are based on Linux distributions, understanding package managers like `apt` (Debian/Ubuntu), `yum`/`dnf` (RHEL/CentOS/Fedora), and `apk` (Alpine Linux) is essential for building Docker images. In a Dockerfile, you typically use `RUN` instructions with package managers to install the dependencies your application needs, and it is a best practice to clean up package caches afterward to keep image sizes small.

Visit the following resources to learn more:

- [@article@APT Package Manager Guide](https://ubuntu.com/server/docs/package-management)
- [@article@Alpine Linux Package Management](https://wiki.alpinelinux.org/wiki/Alpine_Package_Keeper)
- [@video@Linux Package Managers Explained](https://www.youtube.com/watch?v=-iSMFoPPbKU)
- [@feed@Explore top posts about Docker](https://app.daily.dev/tags/docker?ref=roadmapsh)
