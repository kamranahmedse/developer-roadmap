# Using Third Party Images: Databases

Databases are an essential component of many applications and services. In this section, we'll discuss how to use third party images for databases within your Docker projects.

### Overview

Running your database in a Docker container can help streamline your development process and ease deployment. Docker Hub provides numerous pre-made images for popular databases such as MySQL, PostgreSQL, and MongoDB.

### Example: Using MySQL Image

To use a MySQL database, search for the official image on Docker Hub:

```
docker search mysql
```

Find the official image, and pull it:

```
docker pull mysql
```

Now, you can run a MySQL container. Specify the required environment variables, such as `MYSQL_ROOT_PASSWORD`, and optionally map the container's port to your host machine:

```
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -p 3306:3306 -d mysql
```

This command creates a new container named `some-mysql`, sets the root password to `my-secret-pw`, and maps port 3306 on the host to port 3306 on the container.

To connect to the database from another container, use the `--link` flag:

```
docker run --name some-app --link some-mysql:mysql -d my-app
```

### Example: Using PostgreSQL Image

For PostgreSQL, follow similar steps to those outlined above. First, search for the official image:

```
docker search postgres
```

Pull the image:

```
docker pull postgres
```

Run a PostgreSQL container, specifying environment variables such as `POSTGRES_PASSWORD`:

```
docker run --name some-postgres -e POSTGRES_PASSWORD=my-secret-pw -p 5432:5432 -d postgres
```

Link the container to another container to allow communication:

```
docker run --name some-app --link some-postgres:postgres -d my-app
```

### Example: Using MongoDB Image

Running a MongoDB container with Docker follows a similar pattern as previous examples. Search for the official image:

```
docker search mongo
```

Pull the image:

```
docker pull mongo
```

Run a MongoDB container:

```
docker run --name some-mongo -p 27017:27017 -d mongo
```

Link the container to another container:

```
docker run --name some-app --link some-mongo:mongo -d my-app
```

### Conclusion

Docker makes it easy to use third-party images for databases, streamlining your development process and ensuring a consistent environment for your applications. This guide demonstrated examples of using MySQL, PostgreSQL, and MongoDB, but many other database images are available on Docker Hub.