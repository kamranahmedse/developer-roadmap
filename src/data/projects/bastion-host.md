---
title: 'Bastion Host'
description: 'Setup a bastion host for managing access to private infrastructure.'
isNew: true
sort: 1601
difficulty: 'intermediate'
nature: 'Networking'
skills:
  - 'devops'
  - 'security'
  - 'linux'
seo:
  title: 'Bastion Host Setup'
  description: 'Learn how to set up a bastion host to securely manage access to your private infrastructure.'
  keywords:
    - 'bastion host'
    - 'linux'
    - 'security'
    - 'devops'
roadmapIds:
  - 'devops'
---

The goal of this project is to learn and practice how to set up a **bastion host**—a secure entry point that enables authorized users to access private infrastructure or internal systems without exposing them to the public internet.

A **bastion host** is a server specifically designed to act as a secure gateway between external users and a private network. It reduces the attack surface of your infrastructure by being the only publicly accessible server, ensuring that all external connections go through a single, well-secured entry point. Typically, bastion hosts are configured to allow secure SSH or RDP access and are heavily monitored.

---

## Requirements

You will set up a bastion host in a cloud environment and configure it to securely allow access to a private server.

- Choose a cloud provider (e.g., AWS, DigitalOcean, GCP, Azure) and create **two servers**:
  - **Bastion Host** (publicly accessible).
  - **Private Server** (accessible only from the bastion host IP address and not publicly).

- Configure both the servers to allow SSH connection and configure SSH in a way that you can SSH into the private server by jumping through the bastion host

   ```bash
   Host bastion
       HostName <bastion-ip>
       User <bastion-user>
       IdentityFile <path-to-bastion-private-key>

   Host private-server
       HostName <private-server-ip>
       User <private-server-user>
       ProxyJump bastion
       IdentityFile <path-to-private-server-private-key>
   ```

- Connect to the bastion host using:
  ```bash
  ssh bastion
  ```
- From the bastion host, connect to the private server:
  ```bash
  ssh private-server
  ```
- Alternatively, connect directly using your local machine:
  ```bash
  ssh private-server
  ```

- Optionally set up basic monitoring for SSH access attempts using tools like `fail2ban` for example.

## Stretch Goals

- **Harden Security**: Configure multi-factor authentication (MFA) for the bastion host. Use `iptables` or similar tools for more granular traffic filtering.
- **Automate Setup**: Use Terraform or Ansible to automate the deployment and configuration of your bastion host and private server.

---

## Important Note for Solution Submission

**Do not share sensitive information (e.g., private keys, IP addresses) in public repositories.** Your submission should contain a `README.md` file describing the steps and configurations you used to complete the project.

---

After completing this project, you will have a strong understanding of how to set up a bastion host and securely manage access to private infrastructure. This foundational knowledge will prepare you for more advanced projects in network and infrastructure security.