---
title: 'EC2 Instance'
description: 'Create an EC2 instance on AWS and connect to it using SSH.'
isNew: false
sort: 1001
difficulty: 'beginner'
nature: 'AWS'
skills:
  - 'aws'
  - 'ec2'
  - 'linux'
  - 'devops'
seo:
  title: 'EC2 Instance'
  description: 'Create an EC2 instance on AWS and connect to it using SSH.'
  keywords:
    - 'ec2'
    - 'aws'
    - 'linux'
roadmapIds:
  - 'devops'
---

The goal of this project is to create an AWS account, set up a Linux server on AWS EC2, and deploy a simple static website. This project will help you gain hands-on experience with cloud computing, specifically with Amazon Web Services (AWS).

## Requirements

You are required to complete the following tasks:

- Create an AWS account if you don't have one already.
- Familiarize yourself with the AWS Management Console.
- Launch an EC2 instance with the following specifications:
   - Use Ubuntu Server AMI.
   - Choose a `t2.micro` instance type (eligible for AWS Free Tier).
   - Use the default VPC and subnet for your region.
   - Configure the security group to allow inbound traffic on ports `22` (SSH) and `80` (HTTP).
   - Create a new key pair or use an existing one for SSH access.
   - Assign a public IP address to your instance.
- Connect to your EC2 instance using SSH and the private key.
- Update the system packages and install a web server (e.g., Nginx).
- Create a simple HTML file for your static website.
- Deploy the static website to your EC2 instance.
- Access your website using the public IP address of your EC2 instance.

## Stretch Goals

If you want to challenge yourself further, try these additional tasks:

- Set up a custom domain name for your website using Amazon Route 53.
- Implement HTTPS using a free SSL/TLS certificate from Let's Encrypt.
- Create a simple CI/CD pipeline using AWS CodePipeline to automatically deploy changes to your website.

## Learning Outcomes

After completing this project, you will have gained practical experience in:

- Creating basic AWS resources
- Learn about [AWS instances, types and differences](https://kamranahmed.info/posts/up-and-running-with-aws-ec2)
- Launching and configuring EC2 instances
- Connecting to Linux servers using SSH
- Basic server administration and web server setup
- Deploying static websites to cloud infrastructure


<hr />

After finishing this project you should have a good understanding of launching and connecting to EC2 instances, basic knowledge of security groups, and be able to deploy any of the projects from previous tasks using AWS EC2. Future project ideas will be based on these concepts.
