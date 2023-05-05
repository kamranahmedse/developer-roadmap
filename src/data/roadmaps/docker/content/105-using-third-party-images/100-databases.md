# Using Third Party Images: Databases

Running your database in a Docker container can help streamline your development process and ease deployment. Docker Hub provides numerous pre-made images for popular databases such as MySQL, PostgreSQL, and MongoDB.

### Example: Using MySQL Image

To use a MySQL database, search for the official image on Docker Hub:

```bash
docker search mysql
```

Find the official image, and pull it:

```bash
docker pull mysql
```

Now, you can run a MySQL container. Specify the required environment variables, such as `MYSQL_ROOT_PASSWORD`, and optionally map the container's port to your host machine:

```bash
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -p 3306:3306 -d mysql
```

This command creates a new container named `some-mysql`, sets the root password to `my-secret-pw`, and maps port 3306 on the host to port 3306 on the container.

## Example: Using PostgreSQL Image

For PostgreSQL, follow similar steps to those outlined above. First, search for the official image:

```bash
docker search postgres
```

Pull the image:

```bash
docker pull postgres
```

Run a PostgreSQL container, specifying environment variables such as `POSTGRES_PASSWORD`:

```bash
docker run --name some-postgres -e POSTGRES_PASSWORD=my-secret-pw -p 5432:5432 -d postgres
```

### Example: Using MongoDB Image

Running a MongoDB container with Docker follows a similar pattern as previous examples. Search for the official image:

```bash
docker search mongo
```

Pull the image:

```bash
docker pull mongo
```

Run a MongoDB container:

```bash
docker run --name some-mongo -p 27017:27017 -d mongo
```