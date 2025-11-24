---
title: 'Static Site Server'
description: 'Setup a basic linux server and configure it to serve a static site.'
isNew: false
sort: 600
difficulty: 'beginner'
nature: 'Nginx'
skills:
  - 'nginx'
  - 'SSH'
  - 'linux'
  - 'devops'
  - 'rsync'
seo:
  title: 'Static Site Server'
  description: 'Setup a basic linux server and configure it to serve a static site.'
  keywords:
    - 'static site server'
    - 'nginx'
    - 'SSH'
    - 'linux'
    - 'devops'
    - 'rsync'
roadmapIds:
  - 'devops'
---

The goal of this project is to help you understand the basics of setting up a web server using a basic static site served using Nginx. You will also learn how to use `rsync` to deploy your changes to the server.

## Requirements

Here are the requirements for this project:

- Register and setup a remote linux server on any provider e.g. a simple droplet on [DigitalOcean](https://m.do.co/c/b29aa8845df8) which gives you $200 in free credits with the link. Alternatively, use AWS or any other provider.
- Make sure that you can connect to your server using SSH.
- Install and configure `nginx` to serve a static site.
- Create a simple webpage with basic HTML, CSS and image files.
- Use `rsync` to update a remote server with a local static site.
- If you have a domain name, point it to your server and serve your static site from there. Alternatively, set up your nginx server to serve the static site from the server's IP address.

You can write a script `deploy.sh` which when you run will use `rsync` to sync your static site to the server.

<hr />

Once you have completed the project, you should have a basic understanding of how to setup a web server using a basic static site served using Nginx. You should also have a basic understanding of how to use `rsync` to deploy your changes to the server.