---
title: 'Dockerized Service'
description: 'Use GitHub Actions to Deploy a Dockerized Node.js Service'
isNew: false
sort: 13
difficulty: 'intermediate'
nature: 'Docker'
skills:
  - 'nodejs'
  - 'docker'
  - 'devops'
seo:
  title: 'Dockerized Service Deployment'
  description: 'Use GitHub Actions to Deploy a Dockerized Node.js Service to a remote server'
  keywords:
    - 'Docker'
    - 'DigitalOcean'
    - 'Node.js'
    - 'GitHub Actions'
roadmapIds:
  - 'devops'
---

The goal of this project is to dockerize a simple Node.js service and deploy it to a remote server using GitHub Actions. You will also practice secrets management.

## Requirements

There are 4 parts to this project:

- **Step 1** — Creating a Node.js service
- **Step 2** — Dockerizing the Node.js service
- **Step 3** — Setup a remote Linux Server
- **Step 4** — Deploying the Dockerized Node.js service to a remote server using GitHub Actions

### Part 1: Creating a Node.js service

You are required to create a simple Node.js service with two routes:

- `/` route - which simply returns `Hello, world!`
- `/secret` route - protected by Basic Auth

Project should have a `.env` file with the following variables:

- `SECRET_MESSAGE` - the secret message that the `/secret` route should return
- `USERNAME` - the username for the Basic Auth
- `PASSWORD` - the password for the Basic Auth

When user visits the `/secret` route, they should be prompted for the username and password. If the username and password are correct, they should be able to see the secret message. If the username and password are incorrect, they should see an error message.

### Part 2: Dockerizing the Node.js service

Create a Dockerfile for the Node.js service that will build a Docker image. You should be able to run the Docker image locally. Make sure that the `.env` file is not included in the Docker image.

### Part 3: Setup a remote Linux Server

Setup a remote Linux server on either [DigitalOcean](https://m.do.co/c/b29aa8845df8), AWS, or any other provider. You can either set it up manually by using SSH or use a mix of Ansible or Terraform from previous projects.

### Part 4: Deploy the Dockerized Node.js service

Create a workflow that will build a Docker image and push it to the container registry. The workflow should then deploy the Docker image to the remote server. Feel free to explore secrets management in GitHub Actions. I will leave the implementation details to you.

<hr />

Once you are done with the project, you will have practiced dockerizing applications, setting up remote servers, implementing CI/CD workflows and secrets management.
