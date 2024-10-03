# Service Management in Linux

Service Management in Linux refers to the system of controlling the services (or "daemons") that Linux starts and stops during the boot process. These services perform various functions and provide background processes that are not directly attached to the user interface.

As a Linux system administrator, managing these services is a crucial skill. You may need to start, stop, enable, or disable services, as well as check their status. In modern Linux distributions, service management is primarily handled by the systemd init system, which provides the `systemctl` command-line tool.

Here's an example of how to manage the SSH daemon (sshd) service on Ubuntu Linux using systemctl:

```bash
# Start the sshd service
sudo systemctl start sshd

# Check the status of the sshd service
sudo systemctl status sshd

# Enable the sshd service to start automatically at boot
sudo systemctl enable sshd

# Stop the sshd service
sudo systemctl stop sshd

# Restart the sshd service
sudo systemctl restart sshd

# Reload the sshd service configuration without interrupting active connections
sudo systemctl reload sshd
```

Other common service management commands include:

- `systemctl list-units`: List all active units (services, sockets, etc.)
- `systemctl list-unit-files`: List all available unit files and their enable state
- `systemctl is-enabled sshd`: Check if the sshd service is enabled to start at boot
- `systemctl mask sshd`: Prevent the sshd service from being started
- `systemctl unmask sshd`: Undo the masking of the sshd service
