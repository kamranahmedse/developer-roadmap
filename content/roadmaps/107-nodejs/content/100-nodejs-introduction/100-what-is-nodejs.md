# What is nodejs?

Node.js is a command line interface to run Javascript code.
It was crated by **Ryan Dahl** in 2009 and had a high influence on how the javascript language looks today.
Node.js expanded the possibilities of javascript by granting access to files, network, and allowng the code to run in multiple threads.

## Background

Node.js reimplemented Google's V8 engine and added and event loop and low level I/O to it. This created a lightweight javascript compiler that has everything a server needs to run.
It has a variety of built-in packages that allows you to interact with the system:

| [Fs](https://nodejs.org/docs/latest-v18.x/api/fs.html) | Allows you to interact with your computer's files. |
| [HTTP](https://nodejs.org/docs/latest-v18.x/api/http.html)/[Http v2](https://nodejs.org/docs/latest-v16.x/api/http2.html) | A basic, low level interface for interacting with the web. |
| [HTTPS](https://nodejs.org/docs/latest-v18.x/api/https.html) | Secure http connection, supports most standard encryption methods. |
| [Net](https://nodejs.org/docs/latest-v18.x/api/net.html) | Controls the connections to the computer that are managed by Node.js. Basically the firewall interface for your server. |
| [Web Crypto Api](https://nodejs.org/docs/latest-v18.x/api/webcrypto.html) | Hashes and encryption methods built into Node.js |
| [Debugger](https://nodejs.org/docs/latest-v18.x/api/debugger.html) | Node.js's built-in debugger interface that everyone tend to forget. |

## Packages

Node.js offers a variety of libraries throught it's package manager NPM *(Node Package Manager)*
We have an etire section dedicated for NPM in this roadmap.

Some of the more important packages that are good to know:

| [Express](https://expressjs.com/) | The most used server library that makes creating a server really easy. | `npm i express` |
| [Axios](https://github.com/axios/axios) | A library spcifically to make HTTP requests easier. | `npm i axios` |
| [MongoDB](https://www.npmjs.com/package/mongodb) | A Mongo DB interface for your node.js application. MongoDB offers you a database where you don't need to learn a separate laguage to add, delete or query values like in SQL. | `npm i mongodb` |
| [Sequelize](https://sequelize.org/) | The joker card for the golden standard of databases, SQL. Supports Postgres, MySQL, MariaDB, SQLite, DB2, Microsoft SQL Server, and Snowflake. | `npm i sequelize` |
| [Pug](https://pugjs.org/api/getting-started.html) | Helps you to create dynamic content through a special markup language called Pug | `npm i pug` |
