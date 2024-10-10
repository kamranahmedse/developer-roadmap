---
title: 'Service Discovery'
description: 'Setup service discovery with dummy services and Consul'
isNew: false
sort: 21
difficulty: 'advanced'
nature: 'DevOps'
skills:
  - 'devops'
  - 'consul'
  - 'api-gateway'
  - 'monitoring'
seo:
  title: 'Service Discovery'
  description: 'Setup service discovery with dummy services and Consul'
  keywords:
    - 'Service Discovery'
    - 'DevOps'
    - 'Consul'
roadmapIds:
  - 'devops'
---

The goal of this project is to help you understand how service discovery works and how to setup Consul to manage your services. The learning objectives are:

- Understand how services register with Consul
- Learn how to query Consul for service information
- Implement a basic service discovery mechanism
- Understand service-to-service communication in a microservices architecture

## Requirements

The project has multiple parts:

### Dummy Services

You are required to create 3 dummy services, each service will just have a dummy endpoint (e.g. `/info`) that returns the current timestamp and the service name (e.g. Service A, Service B and Service C). Services should register themselves with Consul on startup.

### API Gateway

API gateway acts as a single point of entry for the application. It will be responsible for discovering the services using Consul's DNS interface or the API. The API gateway should be able to route requests to the appropriate service.

### Consul

Consul will be used to store the service information and to provide a single point of contact for the API gateway to discover the services.

<hr />

Once you have completed the project, you should have a basic understanding of how service discovery works and how to setup Consul to manage your services.