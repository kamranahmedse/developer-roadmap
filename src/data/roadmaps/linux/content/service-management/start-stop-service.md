# Start Stop Service

In Linux, Service Management refers to controlling and managing system services, such as firewall, network, database, and other essential services. This play a critical role in the system's functionality and stability.

One of the fundamental parts of service management in Linux is starting and stopping service. System administrators often need to start, stop, or restart services after an update or configuration changes. In Linux, this can be done using the `systemctl` command.

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