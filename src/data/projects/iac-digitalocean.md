---
title: 'IaC on DigitalOcean'
description: 'Write Terraform code to create a Droplet on DigitalOcean'
isNew: false
sort: 10
difficulty: 'intermediate'
nature: 'Terraform'
skills:
  - 'terraform'
  - 'linux'
  - 'devops'
seo:
  title: 'IaC on DigitalOcean'
  description: 'Write Terraform code to create a Droplet on DigitalOcean'
  keywords:
    - 'IaC'
    - 'Terraform'
    - 'DigitalOcean'
roadmapIds:
  - 'devops'
---

The goal of this project is to introduce you to the basics of IaC using Terraform. You will create a DigitalOcean Droplet and configure it using Terraform.

## Requirements

If you have been doing the previous projects, you should already have a Linux server running. If not, setup a Linux server on [DigitalOcean](https://m.do.co/c/b29aa8845df8), AWS or another cloud provider.

You are required to write a Terraform script that will create a Droplet on DigitalOcean. The Droplet should have a public IP address, and SSH access. You should also be able to SSH into the Droplet using the private key.

You can use [this guide from Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-use-terraform-with-digitalocean) and [Digital Ocean provider documentation](https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs) to get started.

## Stretch goal

Write Ansible playbook that will configure the server. You can use the same playbook from [the previous project](/projects/configuration-management).

<hr />

Once you are done with the project, you should have a good understanding of setting up a basic infrastructure on DigitalOcean using Terraform and configuring it using Ansible.