---
title: 'Blue-Green Deployment'
description: 'Setup a blue-green deployment strategy for your application.'
isNew: false
sort: 1700
difficulty: 'advanced'
nature: 'DevOps'
skills:
  - 'bash'
  - 'devops'
  - 'monitoring'
seo:
  title: 'Blue-Green Deployment'
  description: 'Setup a blue-green deployment strategy for your application.'
  keywords:
    - 'Blue-Green Deployment'
    - 'Deployment Strategy'
    - 'DevOps'
    - 'Server Metrics'
roadmapIds:
  - 'devops'
---

The goal of this project is to practice setting up a blue-green deployment strategy for a simple web application. This will allow you to deploy your application in a more efficient and reliable way.

## Requirement

You are required to take an existing application (e.g. the one you built in [multi-container service project](/projects/multi-container-service)) and setup a blue-green deployment strategy for it. The goal is to deploy the next version of the application in a separate container and switch the traffic to the new container only when the new version is ready.

## Bonus

- Setup a CI/CD pipeline to automatically deploy the application to the server when the code is pushed to the repository.
- Setup a monitoring system to monitor the application and the deployment process.

<hr />

After finishing this project you will have a good understanding of how to deploy a containerized application in a more efficient way without downtime and with zero data loss.