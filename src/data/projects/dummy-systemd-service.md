---
title: 'Dummy Systemd Service'
description: 'Create a long-running systemd service that logs to a file.'
isNew: false
sort: 900
difficulty: 'beginner'
nature: 'Systemd'
skills:
  - 'Linux'
  - 'DevOps'
  - 'Systemd'
seo:
  title: 'Dummy Systemd Service'
  description: 'Create a long-running Systemd service that autorestarts and logs to a file.'
  keywords:
    - 'Dummy Systemd Service'
    - 'Systemd Service'
    - 'Systemd'
roadmapIds:
  - 'devops'
---

The goal of this project is to get familiar with `systemd`; creating and enabling a service, checking the status, keeping an eye on the logs, starting and stopping the service, etc.

## Requirements

Create a script called `dummy.sh` that keeps running forever and writes a message to the log file every 10 seconds simulating an application running in the background. Here is an example script:

```bash
#!/bin/bash

while true; do
  echo "Dummy service is running..." >> /var/log/dummy-service.log
  sleep 10
done
```

Create a systemd service `dummy.service` that should start the app automatically on boot and keep it running in the background. If the service fails for any reason, it should automatically restart.

You should be able to `start`, `stop`, `enable`, `disable`, check the `status` of the service, and check the logs i.e. following commands should be available for the service:

```bash
# Interacting with the service
sudo systemctl start dummy
sudo systemctl stop dummy
sudo systemctl enable dummy
sudo systemctl disable dummy
sudo systemctl status dummy

# Check the logs
sudo journalctl -u dummy -f
```

<hr />

After completing this project, you will have a good understanding of systemd, creating custom services, managing existing services, debugging issues, and more.