---
title: 'Setup a Bastion Host on AWS'
description: 'Create a Bastion Host to securely connect to private EC2 instances.'
isNew: true
sort: 1002
difficulty: 'beginner'
nature: 'AWS'
skills:
  - 'aws'
  - 'networking'
  - 'ec2'
  - 'devops'
  - 'terraform' 
seo:
  title: 'Setup a Bastion Host on AWS'
  description: 'Create a secure Bastion Host on AWS to manage private resources.'
  keywords:
    - 'bastion host'
    - 'aws bastion'
    - 'secure access aws'
    - 'private ec2 access'
roadmapIds:
  - 'devops'
---

In this project, you will use Terraform to create a Bastion Host on AWS and use it to securely connect to a private EC2 instance.

## Requirements

- Using Terraform, create a VPC with both public and private subnets.
- Using Terraform, create a Bastion Host EC2 instance in the public subnet.
- Using Terraform, create a private EC2 instance in the private subnet.
- The Bastion Host should:
  - Have a security group that allows SSH access **only from your IP address**.
  - Have a public IP address.
- The private EC2 instance should:
  - Only allow SSH access **from the Bastion Host's security group**.
  - Have no public IP address.
- SSH into the private EC2 instance via the Bastion Host.
- Implement at least one security best practice, such as logging or IP restriction.

## Optional Enhancements

- Use IAM Roles to restrict access to the Bastion Host.
- Enable CloudWatch for SSH logging.
- Automate shutdown/startup of the Bastion Host using AWS Lambda.

Learn more about Bastion Hosts [here](https://goteleport.com/blog/ssh-bastion-host/).
