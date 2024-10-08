---
title: 'SSH Remote Server Setup'
description: 'Setup a basic remote linux server and configure it to allow SSH.'
isNew: false
sort: 4
difficulty: 'beginner'
nature: 'SSH'
skills:
  - 'devops'
  - 'linux'
seo:
  title: 'SSH Remote Server Setup'
  description: 'Setup a remote linux server and configure it to allow SSH.'
  keywords:
    - 'ssh'
    - 'linux'
    - 'server'
roadmapIds:
  - 'devops'
---

The goal of this project is to learn and practice the basics of Linux. You are required to setup a remote linux server and configure it to allow SSH connections.

## Requirements

You are required to setup a remote linux server and configure it to allow SSH connections.

- Register and setup a remote linux server on any provider e.g. a simple droplet on [DigitalOcean](https://m.do.co/c/b29aa8845df8) which gives you $200 in free credits with the link. Alternatively, use AWS or any other provider.
- Create **two new SSH key pairs** and add them to your server.
- You should be able to connect to your server using both SSH keys.

You should be able to use the following command to connect to your server using both SSH keys.

```bash
ssh -i <path-to-private-key> user@server-ip
``` 

Also, look into setting up the configuration in `~/.ssh/config` to allow you to connect to your server using the following command.

```bash
ssh <alias>
```

The only outcome of this project is that you should be able to SSH into your server using both SSH keys. Future projects will cover other aspects of server setup and configuration.

Stretch goal: install and configure `fail2ban` to prevent brute force attacks.

<hr />

## Important Note for Solution Submission

**Do not push your private key to any public repository.** The solution to this project should just contain one `README.md` file with the steps you took to complete the project.

<hr />

After completing this project, you will have a basic understanding of how to setup a remote linux server and configure it to allow SSH connections. Future projects will cover other aspects of server setup.