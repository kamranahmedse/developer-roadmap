# Nomad: Deploying Containers

[Nomad](https://www.nomadproject.io/) is a powerful and flexible tool for deploying containers. It is designed by HashiCorp, the creators of other popular DevOps tools such as Terraform and Vault. In this section, we'll cover the basics of Nomad and explore how you can use it to easily deploy and manage your containerized applications.

### What is Nomad?

Nomad is a cluster manager and scheduler that enables you to deploy, manage and scale your containerized applications. It automatically handles node failures, resource allocation, and container orchestration. Nomad supports running Docker containers as well as other container runtimes and non-containerized applications.

### Key Features

- **Flexible Deployment**: Nomad supports multiple container runtimes, including Docker, as well as non-containerized applications.
- **Highly Scalable**: Nomad is designed to scale from a single machine to thousands of nodes, promoting efficient resource utilization.
- **Resilient**: Nomad automatically handles node failures, maintaining the desired application state and count.
- **Simple to Use**: Nomad features a single binary and a single configuration file, making it easy to get started.
- **HashiCorp Ecosystem Integration**: Nomad works seamlessly with other HashiCorp tools such as Consul for service discovery and Vault for secrets management.

### Getting Started with Nomad

To start using Nomad, you'll need to install the Nomad binary on your system. You can download it from the [official website](https://www.nomadproject.io/downloads). Once installed, you can start using Nomad to deploy and manage your containers.

#### Step 1: Set up a Nomad cluster

A Nomad cluster consists of one or more client nodes and one or more server nodes. You'll need to configure and start the server(s) and client(s), specifying their roles and communication settings.

Server configuration example:

```hcl
data_dir = "/path/to/data-dir"

server {
  enabled = true
  bootstrap_expect = 3
}
```

Client configuration example:

```hcl
data_dir = "/path/to/data-dir"

client {
  enabled = true
  servers = ["server1:4647", "server2:4647", "server3:4647"]
}
```

#### Step 2: Define your job specification

Jobs are the unit of work in Nomad, and they are defined using HashiCorp Configuration Language (HCL). You'll create a job specification file for your container deployment. 

Example job specification for a Docker container:

```hcl
job "example" {
  datacenters = ["dc1"]

  group "web" {
    task "app" {
      driver = "docker"

      config {
        image = "your-docker-image"
        ports = ["http"]
      }

      resources {
        cpu    = 500
        memory = 256
        network {
          mbits = 10
          port "http" {}
        }
      }
    }
  }
}
```

#### Step 3: Deploy your job

To deploy your job, you'll submit the job specification to Nomad using the `nomad run` command. Nomad will schedule and deploy the containers on the available nodes, handling failures and scaling as needed.

```shell
$ nomad run example-job.hcl
```

### Next Steps

We've covered the basics of Nomad and deploying containers with it. You can now experiment with more advanced features like integrating with Consul and Vault, or explore different deployment strategies like Canary or Blue/Green. To dive deeper into Nomad, check out the [official documentation](https://www.nomadproject.io/docs).