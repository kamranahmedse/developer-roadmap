---
title: 'Session Based Authentication'
description: 'Learn what is Session Based Authentication and how to implement it in Node.js'
authorId: 'kamran'
seo:
  title: 'Session Based Authentication - roadmap.sh'
  description: 'Learn what is Session Based Authentication and how to implement it in Node.js'
isNew: false
type: 'textual'
date: 2022-11-01
sitemap:
  priority: 0.7
  changefreq: 'weekly'
tags:
  - 'guide'
  - 'textual-guide'
  - 'guide-sitemap'
---

HTTP is the internet protocol that standardizes how clients and servers interact with each other. When you open a website, among other things, HTTP is the protocol that helps load the website in the browser.

## HTTP is Stateless

HTTP is a stateless protocol which means that each request made from the client to the server is treated as a standalone request; neither the client nor the server keeps track of the subsequent requests. Sessions allow you to change that; with sessions, the server has a way to associate some information with the client so that when the same client requests the server, it can retrieve that information.

In this guide, we will learn what is Session-Based Authentication and how to implement it in Node.js. We also have a separate [visual guide on Session-Based Authentication](/guides/session-authentication) as well that explains the topic visually.

## What is Session-Based Authentication?

Session-based authentication is a stateful authentication technique where we use sessions to keep track of the authenticated user. Here is how Session Based Authentication works:

- User submits the login request for authentication.
- Server validates the credentials. If the credentials are valid, the server initiates a session and stores some information about the client. This information can be stored in memory, file system, or database. The server also generates a unique identifier that it can later use to retrieve this session information from the storage. Server sends this unique session identifier to the client.
- Client saves the session id in a cookie and this cookie is sent to the server in each request made after the authentication.
- Server, upon receiving a request, checks if the session id is present in the request and uses this session id to get information about the client.

And that is how session-based authentication works.

## Session-Based Authentication in Node.js

Now that we know what session-based authentication is, let's see how we can implement session-based authentication in Node.js.

Please note that, for the sake of simplicity, I have intentionally kept the project strictly relevant to the Session Based Authentication and have left out a lot of details that a production-ready application may require. Also, if you don't want to follow along, project [codebase can be found on GitHub](https://github.com/kamranahmedse/node-session-auth-example).

First things first, create an empty directory that will be holding our application.

```shell
mkdir session-auth-example
```

Now run the following command to setup a sample `package.json` file:

```shell
npm init -y
```

Next, we need to install the dependencies:

```shell
npm install express express-session
```

`Express` is the application framework, and `express-session` is the package that helps work with sessions easily.

### Setting up the server

Now create an `index.js` file at the root of the project with the following content:

```javascript
const express = require('express');
const sessions = require('express-session');

const app = express();

app.use(
  sessions({
    secret: 'some secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
    resave: true,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// @todo register routes

app.listen(3000, () => {
  console.log(`Server Running at port 3000`);
});
```

The important piece to note here is the `express-session` middleware registration which automatically handles the session initialization, cookie parsing and session data retrieval, and so on. In our example here, we are passing the following configuration options:

- `secret`: This is used to sign the session ID cookie. Using a secret that cannot be guessed will reduce the ability to hijack a session.
- `cookie`: Object containing the configuration for session id cookie.
- `resave`: Forces the session to be saved back to the session store, even if the session data was never modified during the request.
- `saveUninitialized`: Forces an "uninitialized" session to be saved to the store, i.e., saves a session to the store even if the session was not initiated.

Another important option is `store` which we can configure to change how/where the session data is stored on the server. By default, this data is stored in the memory, i.e., `MemoryStore`.

Look at the [express-session documentation](https://github.com/expressjs/session) to learn more about the available options.

### Creating Handlers

Create a directory called the `handlers` at the project's root. This is the directory where we will be placing all the route-handling functions.

Now let's create the homepage route, which will show the welcome message and a link to log out for the logged-in users and redirect to the login screen for the logged-out users. Create a file at `handlers/home.js` with the following content.

```javascript
module.exports = function HomeHandler(req, res) {
  if (!req.session.userid) {
    return res.redirect('/login');
  }

  res.setHeader('Content-Type', 'text/HTML');
  res.write(`
    <h1>Welcome back ${req.session.userid}</h1>
    <a href="/logout">Logout</a>
  `);

  res.end();
};
```

At the top of this function, you will notice the check `req.session.userid`. `req.session` is automatically populated using the session cookie by the `express-session` middleware that we registered earlier. `req.session.userid` is one of the data fields that we will set to store the `userid` of the logged in user.

Next, we need to register this handler with a route. Open the `index.js` file at the root of the project and register the following route:

```javascript
const HomeHandler = require('./handlers/home.js');

app.get('/', HomeHandler);
```

Next, we have the login page, redirecting the user to the home screen if the user is logged in or showing the login form. Create a file at `handlers/login.js` with the following content:

```javascript
module.exports = function LoginHandler(req, res) {
  if (req.session.userid) {
    return res.redirect('/');
  }

  res.setHeader('Content-Type', 'text/HTML');
  res.write(`
    <h1>Login</h1>
    <form method="post" action="/process-login">
      <input type="text" name="username" placeholder="Username" /> <br>
      <input type="password" name="password" placeholder="Password" /> <br>
      <button type="submit">Login</button>
    </form>
  `);

  res.end();
};
```

Again, at the top of the function, we are simply checking if we have `userid` in the session (which means the user is logged in). If the user is logged in, we redirect them to the homepage; if not, we show the login screen. In the login form, we have the method of `post`, and we submit the form to `/process-login`. Please note that, for the sake of simplicity, we have a simple HTML string returned in the response, but in a real-world application, you will probably have a separate view file.

Let's first register this page and then implement `/process-login` endpoint. Open the `index.js` file from the root of the project and register the following route:

```javascript
const LoginHandler = require('./handlers/login.js');

app.get('/login', LoginHandler);
```

Next, we have to implement the functionality to process the login form submissions. Create a file at `handlers/process-login.js` with the following content:

```javascript
module.exports = function processLogin(req, res) {
  if (req.body.username !== 'admin' || req.body.password !== 'admin') {
    return res.send('Invalid username or password');
  }

  req.session.userid = req.body.username;

  res.redirect('/');
}
```

As you can see, we are simply checking that the username and password should both be `admin` and `admin` for a user to authenticate successfully. Upon finding valid credentials, we set the `userid` in the session by updating `req.session.userid`. Similarly, you can set any data in the session. For example, if we wanted to store the user role, we would do the following:

```javascript
req.session.role = 'admin';
```

And later access this value out of the session anywhere in the subsequent requests.

Register this route in the `index.js` file at the root of the project:

```javascript
const ProcessLoginHandler = require('./handlers/process-login.js');

app.post('/process-login', ProcessLoginHandler);
```

Finally, we have the logout functionality. Create a file at `handlers/logout.js` with the following content:

```javascript
module.exports = function Logout(req, res) {
  req.session.destroy();
  res.redirect('/');
};
```

We reset the session by calling `req.session.destroy()` and then redirecting the user to the homepage. Register the logout handler in the `index.js` file using the following:

```javascript
const LogoutHandler = require('./handlers/logout.js');

app.get('/logout', LogoutHandler);
```

## Running the Application

Open the `package.json` file and register the `start` script as follows:

```javascript
"scripts": {
  "start": "node index.js"
},
```

Now you can start the application by running the following command:

```shell
npm run start
```

Now, if you open up your browser and visit the project at `http://localhost:3000` you will be able to see the Session-Based Authentication in action.
