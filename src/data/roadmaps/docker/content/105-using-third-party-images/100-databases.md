# Using Databases

Running your database in a Docker container can help streamline your development process and ease deployment. Docker Hub provides numerous pre-made images for popular databases such as MySQL, PostgreSQL, and MongoDB.

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

Visit the following resources to learn more:

- [@official@Containerized Databases](https://docs.docker.com/guides/use-case/databases/)
