# Snap & Flatpak

## Snap
Snap is a modern approach to package management in Linux systems promoted by Canonical (the company behind Ubuntu). Unlike traditional package management systems such as dpkg or RPM, Snap focuses on providing software as self-contained packages (known as 'Snaps') that include all of their dependencies. This ensures that a Snap application runs consistently across a variety of different Linux distributions.

Snaps are installed from a Snapcraft store and are automatically updated in the background. The Snap update process is transactional, meaning if something goes wrong during an update, Snap can automatically revert to the previous working version.

Here is a simple example of a snap command: 

```sh
sudo snap install [package-name]
```
In the command above, `[package-name]` is the name of the snap package you want to install. You must run this command as the superuser (sudo), as root privileges are needed to install packages.
## Flatpak
Flatpak is another approach for software deployment. It basically provides a sandbox environment to isolate applications from the system. This can be installed in any existing linux distro (also called as distribution agnostic).
The following guide may guide you to use this approach:

- [Flatpak guide](https://www.youtube.com/watch?v=hvc5YQKMys0)
