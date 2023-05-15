# Checkpoint

At this point you should be able to build CLI applications using Node.js or whatever backend programming language you picked.

You should be able to build a CLI application that can:

- Read and write files
- Parse command line arguments
- Make HTTP requests
- Parse JSON
- Use a third-party library (e.g. a library for parsing CSV files)
- Use a third-party API

Here are some ideas for CLI applications you can build: 

- Create a CLI application that takes a URL and a CSS selector arguments and prints the text content of the element that matches the selector. **Hint** you can use [cheerio](https://github.com/cheeriojs/cheerio)
- An application that takes optionally takes two dates and prints the most starred GitHub projects in that date range. **Hint** you can use [GitHub's search API](https://developer.github.com/v3/search/#search-repositories)
- Bulk rename files in a directory. **Hint** you can use [fs](https://nodejs.org/api/fs.html) and [path](https://nodejs.org/api/path.html)
- Write a CLI application that takes a path as input and compresses all the images in that directory. It should accept an option for output path; if the output path is not given it should compress images in place otherwise write the compressed images to the output path. **Hint** you can use [sharp](https://github.com/lovell/sharp).
