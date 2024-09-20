---
title: 'URL Shortening Service'
description: 'Build a URL Shortener API that helps shorten long URLs.'
isNew: false
sort: 11
difficulty: 'intermediate'
nature: 'API'
skills:
  - 'Programming Language'
  - 'Database Indexing'
  - 'HTTP Redirects'
seo:
  title: 'URL Shortening Service Project Idea'
  description: 'Build a URL Shortener API that helps shorten long URLs.'
  keywords:
    - 'url shortening service'
    - 'backend project idea'
roadmapIds:
  - 'backend'
  - 'nodejs'
  - 'python'
  - 'java'
  - 'golang'
  - 'spring-boot'
---

You are required to create a simple RESTful API that allows users to shorten long URLs. The API should provide endpoints to create, retrieve, update, and delete short URLs. It should also provide statistics on the number of times a short URL has been accessed.

![URL Shortening Service](https://assets.roadmap.sh/guest/url-shortener-architecture-u72mu.png)

## Requirements

You should create a RESTful API for a URL shortening service. The API should allow users to perform the following operations:

- Create a new short URL
- Retrieve an original URL from a short URL
- Update an existing short URL
- Delete an existing short URL
- Get statistics on the short URL (e.g., number of times accessed)

You can optionally setup a minimal frontend to interact with the API and setup redirects for the short URLs to the original URLs.

## API Endpoints

Given below are the details for each API operation.

### Create Short URL

Create a new short URL using the `POST` method

```plaintext
POST /shorten
{
  "url": "https://www.example.com/some/long/url"
}
```

The endpoint should validate the request body and return a `201 Created` status code with the newly created short URL i.e.

```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

or a `400 Bad Request` status code with error messages in case of validation errors. Short codes must be unique and should be generated randomly.

## Retrieve Original URL

Retrieve the original URL from a short URL using the `GET` method

```plaintext
GET /shorten/abc123
```

The endpoint should return a `200 OK` status code with the original URL i.e.

```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

or a `404 Not Found` status code if the short URL was not found. Your frontend should be responsible for retrieving the original URL using the short URL and redirecting the user to the original URL.

## Update Short URL

Update an existing short URL using the `PUT` method

```plaintext
PUT /shorten/abc123
{
  "url": "https://www.example.com/some/updated/url"
}
```

The endpoint should validate the request body and return a `200 OK` status code with the updated short URL i.e.

```json
{
  "id": "1",
  "url": "https://www.example.com/some/updated/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:30:00Z"
}
```

or a `400 Bad Request` status code with error messages in case of validation errors. It should return a `404 Not Found` status code if the short URL was not found.

### Delete Short URL

Delete an existing short URL using the `DELETE` method

```plaintext
DELETE /shorten/abc123
```

The endpoint should return a `204 No Content` status code if the short URL was successfully deleted or a `404 Not Found` status code if the short URL was not found.

### Get URL Statistics

Get statistics for a short URL using the `GET` method

```plaintext
GET /shorten/abc123/stats
```

The endpoint should return a `200 OK` status code with the statistics i.e.

```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z",
  "accessCount": 10
}
```

or a `404 Not Found` status code if the short URL was not found.

<hr />

## Tech Stack

Feel free to use any programming language, framework, and database of your choice for this project. Here are some suggestions:

- If you are using JavaScript, you can use Node.js with Express.js
- If you are using Python, you can use Flask or Django
- If you are using Java, you can use Spring Boot
- If you are using Ruby, you can use Ruby on Rails

For databases, you can use:

- MySQL if you are using SQL
- MongoDB if you are using NoSQL

Your job is to implement the core functionality of the API, focusing on creating, retrieving, updating, and deleting short URLs, as well as tracking and retrieving access statistics. You don't have to implement authentication or authorization for this project.