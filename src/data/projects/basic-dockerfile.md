---
title: 'Basic Dockerfile'
description: 'Build a basic Dockerfile to create a Docker image.'
isNew: false
sort: 1
difficulty: 'beginner'
nature: 'CLI'
skills:
  - 'docker'
  - 'dockerfile'
  - 'linux'
  - 'devops'
seo:
  title: 'Basic Dockerfile'
  description: 'Build a basic Dockerfile to create a Docker image.'
  keywords:
    - 'basic dockerfile'
    - 'dockerfile'
    - 'docker'
roadmapIds:
  - 'devops'
  - 'docker'
---

In this project, you will write a basic Dockerfile to create a Docker image. When this Docker image is run, it should print "Hello, Captain!" to the console before exiting.

## Requirements

- The Dockerfile should be named `Dockerfile`.
- The Dockerfile should be in the root directory of the project.
- The base image should be `alpine:latest`.
- The Dockerfile should contain a single instruction to print "Hello, Captain!" to the console before exiting.


You can learn more about writing a Dockerfile [here](https://docs.docker.com/engine/reference/builder/).

<hr />

If you are looking to build a more advanced version of this project, you can consider adding the ability to pass your name to the Docker image as an argument, and have the Docker image print "Hello, [your name]!" instead of "Hello, Captain!".
