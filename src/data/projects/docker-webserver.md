---
title: 'Docker Web Server'
description: 'Create a Web Server using Docker & NGINX'
isNew: false
sort: 3
difficulty: 'beginner'
nature: 'CLI'
skills:
  - 'docker'
  - 'devops'
  - 'nginx'
  - 'web'
seo:
  title: 'Docker Web Server'
  description: 'Create a Web Server using Docker & NGINX'
  keywords:
    - 'docker web server'
    - 'web server'
    - 'docker'
roadmapIds:
  - 'devops'
  - 'docker'
---

In this project, you will create an NGINX web server that will serve a simple HTML page using Docker.

## Requirements

- The Dockerfile should be named `Dockerfile`.
- The Dockerfile should be in the root directory of the project.
- The build process will add a local HTML file to the container, which will be accessible to NGINX.
- The simple HTML page will be accessible to you from `localhost:8080`


You can learn more about writing a Dockerfile [here](https://docs.docker.com/engine/reference/builder/).

<hr />

If you are looking to build a more advanced version of this project, you can consider using the `alpine:latest` image and setting up NGINX yourself rather than using the official NGINX image.
