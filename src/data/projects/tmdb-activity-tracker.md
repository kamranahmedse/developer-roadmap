---
title: 'TMDB CLI Tool'
description: 'Use TMDB API to fetch movie information and display it in the terminal.'
isNew: false
sort: 2
difficulty: 'beginner'
nature: 'CLI'
skills:
  - 'Programming Language'
  - 'CLI'
  - 'API Consumption'
seo:
  title: 'TMDB CLI Tool'
  description: 'Build a command line interface (CLI) to fetch and display common TMDB requests.'
  keywords:
    - 'tmdb user activity cli'
    - 'backend project idea'
roadmapIds:
  - 'backend'
  - 'nodejs'
  - 'python'
  - 'java'
  - 'golang'
  - 'spring-boot'
  - 'cpp'
---

In this project, you will build a simple command line interface (CLI) to fetch data from The Movie Database (TMSB) and display it in the terminal. This project will help you practice your programming skills, including working with APIs, handling JSON data, and building a simple CLI application.

## Requirements

The application should run from the command line, accept common searches as arguments, and display it in the terminal. The user should be able to:

- Provide common requests as an argument when running the CLI.
  ```bash
  tmdb-app trending
  ```
- Fetch the data from common requests using the TMDB API. You can use the following endpoint to fetch the trending movies:
  ```
  # https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1
  ```
- Display the fetched data in the terminal.

  You can [learn more about the TMDB API here](https://developer.themoviedb.org/reference/intro/getting-started).
- Handle errors gracefully, such as invalid usernames or API failures.
- Use a programming language of your choice to build this project.
- Do not use any external libraries or frameworks to fetch the TMDB activity.

<hr />
