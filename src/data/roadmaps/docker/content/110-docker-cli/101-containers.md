## Containers?

Containers can be thought of as lightweight, stand-alone, and executable software packages that include everything needed to run a piece of software, including the code, runtime, libraries, environment variables, and config files. Containers isolate software from its surroundings, ensuring that it works uniformly across different environments.

## Why Use Containers?

- **Portability**: Containers ensure that applications work consistently across different platforms, be it a developer's laptop or a production server. This eliminates the "it works on my machine" problem.

- **Efficiency**: Containers are lightweight since they use shared resources without the overhead of a full-fledged operating system. This enables faster startup times and reduces resource usage.

- **Scalability**: Containers can be effortlessly scaled up or down according to the workload, making it ideal for distributed applications and microservices.

- **Consistency**: Containers enable developers, QA, and operations teams to have a consistent environment throughout the application lifecycle, leading to faster and smoother deployment pipelines.

- **Security**: Containers provide a level of isolation from other containers and the underlying host system, which aids in maintaining application security.

## Working with Containers using Docker CLI

Docker CLI offers several commands to help you create, manage, and interact with containers. Some common commands include:

- `docker run`: Used to create and start a new container.

- `docker container ls`: Lists running containers.

- `docker container stop`: Stops a running container.

- `docker container rm`: Removes a stopped container.

- `docker exec`: Executes a command inside a running container.

- `docker logs`: Fetches the logs of a container, useful for debugging issues.