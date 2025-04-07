# Services Running

Linux servers are popular for their stability and flexibility, factors that make them a preferred choice for businesses and organizations when it comes to managing various services. Services that run under a Linux server can range from web services to database services, DNS servers, mail servers, and many others. 

As a Linux system administrator, it's important to periodically review these running services to manage resources, check their statuses, and troubleshoot issues, ensuring the health and performance of the server. 

Linux has a variety of tools to achieve this, such as: `systemctl`, `service`, `netstat`, `ss` and `lsof`. 

For example, the command `systemctl` is widely used on Linux systems to list all running services:

```bash
systemctl --type=service 
```
This command will show a list of all active services along with their current status. It is a necessity for server management and should be part of any Linux system administrator's toolbox.