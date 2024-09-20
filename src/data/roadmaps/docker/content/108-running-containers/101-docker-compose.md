# Docker Compose

Docker Compose is a tool for defining and running multi-container Docker applications. It allows you to create, manage, and run your applications using a simple YAML file called `docker-compose.yml`. This file describes your application's services, networks, and volumes, allowing you to easily run and manage your containers using just a single command.

## Creating a Docker Compose File

To create a `docker-compose.yml` file, start by specifying the version of Docker Compose you want to use, followed by the services you want to define. Here's an example of a basic `docker-compose.yml` file:

```yaml
version: "3.9"
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    depends_on:
      - db
  db:
    image: mysql:latest
    environment:
      MYSQL_ROOT_PASSWORD: mysecretpassword
```

The web server exposes its port 80 to the host machine and depends on the launch of the database (`db`).

## Running Docker Compose

To run your Docker Compose application, simply navigate to the directory containing your `docker-compose.yml` file and run the following command:

```bash
docker-compose up
```

Docker Compose will read the file and start the defined services in the specified order.

Visit the following resources to learn more:

- [@official@Docker Compose documentation](https://docs.docker.com/compose/).
