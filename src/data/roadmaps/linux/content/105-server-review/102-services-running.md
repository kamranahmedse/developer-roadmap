# Managing Services on Linux

Linux servers are renowned for their stability and flexibility, making them a preferred choice for businesses and organizations to manage various services. These services can range from web servers and database management to DNS, email, and more.

As a Linux system administrator, regularly reviewing running services is crucial to manage resources, monitor their status, and troubleshoot issues, ensuring the overall health and performance of the server.

Linux provides several tools to accomplish this task, including `systemctl`, `service`, `netstat`, `ss`, and `lsof`.

For example, the `systemctl` command is widely used on Linux systems to list all running services:

```bash
sudo systemctl --type=service
```

This command will display a list of all active services along with their current status. Mastering these tools is essential for effective server management and should be a core part of a Linux system administrator's skillset.

On Ubuntu Linux, you can use the following commands to manage services:

- List all running services:

  ```bash
  sudo systemctl --type=service
  ```

- Start a service:

  ```bash
  sudo systemctl start roadmap_service.service
  ```

- Stop a service:

  ```bash
  sudo systemctl stop roadmap_service.service
  ```

- Restart a service:

  ```bash
  sudo systemctl restart roadmap_service.service
  ```

- Check the status of a service:

  ```bash
  sudo systemctl status roadmap_service.service
  ```
