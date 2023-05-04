# Installation Setup

In this section, we'll discuss the necessary steps to setup Docker on your machine. We'll cover the installation process for various platforms including Windows, macOS, and Linux.

### Windows

If you are using Windows, Docker provides a desktop application called **Docker Desktop** that simplifies the installation and setup process. Here are the steps to install Docker Desktop on Windows:

- Download the installer from the official [Docker Desktop website](https://www.docker.com/products/docker-desktop).
- Run the installer and follow the on-screen instructions.
- Restart your computer after the installation is complete.
- Launch Docker Desktop from the Start menu.

_NOTE: Docker Desktop requires Windows 10 Pro, Enterprise or Education edition._

### macOS

For macOS users, Docker also provides a desktop application called **Docker Desktop** which makes the installation and setup process hassle-free. Follow these steps to install Docker Desktop on macOS:

- Download the installer from the official [Docker Desktop website](https://www.docker.com/products/docker-desktop).
- Open the downloaded `.dmg` file and follow the on-screen instructions.
- After successfully installing the application, launch "Docker Desktop" from the Applications folder.

### Linux

Linux users can install Docker using their respective package manager. Below, we'll provide installation instructions for some popular distributions. For other distributions, refer to the [official Docker documentation](https://docs.docker.com/engine/install/).

#### Ubuntu

Run the following commands in the terminal to install Docker on Ubuntu:

```bash
sudo apt-get update
sudo apt-get install docker.io
```

#### Fedora

Install Docker on Fedora using the `dnf` command:

```bash
sudo dnf update
sudo dnf install docker
```

#### CentOS

To install Docker on CentOS, run the following commands:

```bash
sudo yum update
sudo yum install docker
```

### Post-Installation Steps

After successfully installing Docker, it's essential to perform some post-installation steps to manage Docker as a non-root user and ensure that it starts on system boot.

For Linux users, follow the [post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/) provided in the official Docker documentation.

Windows and macOS users can configure Docker Desktop settings, such as memory and CPU allocation, by right-clicking the Docker icon in the system tray and selecting "Preferences" or "Settings".