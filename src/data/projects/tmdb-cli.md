---
title: 'TMDB CLI Tool'
description: 'Use TMDB API to fetch movie information and display it in the terminal.'
isNew: false
sort: 1100
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
  - 'php'
  - 'nodejs'
  - 'python'
  - 'java'
  - 'golang'
  - 'spring-boot'
  - 'cpp'
---

In this project, you will build a simple command line interface (CLI) to fetch data from The Movie Database (TMDB) and display it in the terminal. This project will help you practice your programming skills, including working with APIs, handling JSON data, and building a simple CLI application.

## Requirements

The application should run from the command line, and be able to pull and show the popular, top-rated, upcoming and now playing movies from the TMDB API. The user should be able to specify the type of movies they want to see by passing a command line argument to the CLI tool.

Here is how the CLI tool usage should look like:

```bash
tmdb-app --type "playing"
tmdb-app --type "popular"
tmdb-app --type "top"
tmdb-app --type "upcoming"
```

You can look at the API documentation to understand how to fetch the data for each type of movie.

- [Now Playing Movies](https://developer.themoviedb.org/reference/movie-now-playing-list)
- [Popular Movies](https://developer.themoviedb.org/reference/movie-popular-list)
- [Top Rated Movies](https://developer.themoviedb.org/reference/movie-top-rated-list)
- [Upcoming Movies](https://developer.themoviedb.org/reference/movie-upcoming-list)

There are some considerations to keep in mind:

- Handle errors gracefully, such as API failures or network issues.
- Use a programming language of your choice to build this project.
- Make sure to include a README file with instructions on how to run the application and any other relevant information.
