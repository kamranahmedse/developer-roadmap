---
title: 'Single Command Database Setup'
description: 'Learn how to run MySQL, PostgreSQL, or MongoDB in Docker with single Command'
authorId: 'kamran'
seo:
  title: 'Single Command Database Setup - roadmap.sh'
  description: 'Learn how to run MySQL, PostgreSQL, or MongoDB in Docker with single Command'
isNew: false
type: 'textual'
date: 2023-02-27
sitemap:
  priority: 0.7
  changefreq: 'weekly'
tags:
  - 'guide'
  - 'guide-sitemap'
---

When you are working on a backend application, you are likely to need a database. You can either install it on your machine or use a Docker container. I prefer to use Docker containers because it is easier to setup and doesn't pollute my machine with unnecessary dependencies.

This short guide will show you how to spin up a MySQL, PostgreSQL, or MongoDB instance on your local machine using docker. Feel free to submit a PR adding more databases.

## PostgreSQL

You can run the following command to run PostgreSQL in a Docker container:

```bash
docker run \
  --name pg \
  --detach \
  --publish 5432:5432 \
  --env POSTGRES_PASSWORD=admin \
  postgres
```

Now you can connect and run commands against the instance using the following:

```bash
docker exec -it pg \
  psql -U postgres
```

## MySQL

You can run the following command to run MySQL in a Docker container:

```bash
docker run \
  --name ms \
  --publish 3306:3306 \
  --detach \
  --env MYSQL_ROOT_PASSWORD=admin \
  mysql
```

Now, you can use the following to run commands against the MySQL instance:

```bash
docker exec -it ms \
  mysql -u root -padmin
```

## MongoDB

You can run the following command to run MongoDB in a Docker container:

```bash
docker run \
  --name mdb \
  --publish 27017:27017 \
  --detach \
  mongo
```

Now, you can use the following to run commands against the MongoDB instance:

```bash
docker exec -it mdb \
  mongo
```

Feel free to [submit a pull request](https://github.com/kamranahmedse/roadmap.sh/tree/master/src/data/guides/single-command-database-setup.md) by adding additional databases to this guide.
