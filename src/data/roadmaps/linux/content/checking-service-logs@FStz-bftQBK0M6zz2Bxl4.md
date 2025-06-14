# Starting and Stopping Services

Linux service management involves controlling system services like databases, web servers, and network services. Use `systemctl start service_name` to start services, `systemctl stop service_name` to stop them, and `systemctl restart service_name` to restart. These commands require root permissions via sudo and are essential for system administration and configuration management.

Here is a simple example:

```bash
# To start a service
sudo systemctl start service_name   

# To stop a service
sudo systemctl stop service_name   

# To restart a service
sudo systemctl restart service_name   
```

Replace `service_name` with the name of the service you want to start, stop or restart. Always make sure to use sudo to execute these commands as they require root permissions.
Please note, these commands will vary based on the specific Linux distribution and the init system it uses.