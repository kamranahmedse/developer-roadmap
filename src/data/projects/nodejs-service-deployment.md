---
title: 'Node.js Service Deployment'
description: 'Use GitHub Actions to Deploy a Node.js Service to a remote server'
isNew: false
sort: 1300
difficulty: 'intermediate'
nature: 'CI/CD'
skills:
  - 'nodejs'
  - 'docker'
  - 'devops'
seo:
  title: 'Node.js Service Deployment'
  description: 'Use GitHub Actions to Deploy a Node.js Service to a remote server'
  keywords:
    - 'Node.js'
    - 'DigitalOcean'
    - 'Docker'
roadmapIds:
  - 'devops'
---

The goal of this project is to practice setting up a CI/CD pipeline for a Node.js service using GitHub Actions. You will practice using GitHub Actions for deployment (including Secrets and environment variables), Terraform to provision a server, Ansible to configure the server, and SSH to deploy the application.

## Requirements

If you haven't completed the previous projects for [Configuration Management](/projects/configuration-management) and [IaC](/projects/iac-digitalocean), you should do that first. You will be able to reuse the Ansible and Terraform code from those projects.

You are required to have the following setup:

- Setup a [DigitalOcean droplet using Terraform](/projects/iac-digitalocean)
- Setup the server using [Ansible](/projects/configuration-management) including installing Node.js and `npm`
- Create a simple Node.js service that just has a `/` route which returns `Hello, world!`
- Push the codebase to GitHub repository

Once you have the above setup, you are required to implement the following:

### Task #1: Manual Ansible Deployment

- Setup a role in ansible called `app` that will connect to the server, clone the repository, install the dependencies, build the application, and start the application.
- You should be able to run the playbook using the following command and the application should be up and running on port `80`:

  ```bash
  ansible-playbook node_service.yml --tags app
  ```

- You should be able to access the application using the public IP address of the server.

### Task #2: Automate Deployment using GitHub Actions

Write a GitHub Action workflow that will deploy the application to the server using one of the following methods. You are welcome to try both options, but you are not required to do that. You are also welcome to use any other method to accomplish the same result.

#### Option #1: Run the playbook in GitHub Actions

Use the `ansible-playbook` command to run the playbook and deploy the application

#### Option #2: Use SSH to connect and deploy the application

Use SSH to connect and deploy the application. Look into [rsync](https://linux.die.net/man/1/rsync) and these GitHub Actions to accomplish this: [web-factory/ssh-agent](https://github.com/webfactory/ssh-agent), [appleboy/ssh-action](https://github.com/appleboy/ssh-action).

<hr />

Once you have the application deployed, you should have a good understanding of automating the process of setting up a server and deploying an application to it.