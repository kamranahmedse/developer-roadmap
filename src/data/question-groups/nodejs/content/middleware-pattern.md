Middleware is a function that has access to the request object, response object, and the next middleware function in the application's request-response cycle. It's a core pattern in Express.js and similar frameworks for handling HTTP requests in a modular way.

## Basic Middleware Structure

```js
// Middleware function signature
function middleware(req, res, next) {
  // Do something with req/res
  console.log(`${req.method} ${req.url}`);
  
  // Pass control to next middleware
  next();
}

// Using middleware
const express = require('express');
const app = express();

app.use(middleware);
```

## Types of Middleware

### 1. Application-level Middleware

```js
const app = express();

// Runs for ALL requests
app.use((req, res, next) => {
  req.requestTime = Date.now();
  next();
});

// Runs only for /api/* routes
app.use('/api', (req, res, next) => {
  console.log('API request');
  next();
});
```

### 2. Router-level Middleware

```js
const router = express.Router();

// Middleware for this router only
router.use((req, res, next) => {
  console.log('Router middleware');
  next();
});

router.get('/users', (req, res) => {
  res.json({ users: [] });
});

app.use('/api', router);
```

### 3. Error-handling Middleware

```js
// Must have 4 parameters
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// Triggering error middleware
app.get('/error', (req, res, next) => {
  const error = new Error('Test error');
  next(error); // Passes to error middleware
});
```

### 4. Built-in Middleware

```js
// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));
```

## Common Middleware Examples

### Authentication Middleware

```js
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Use on protected routes
app.get('/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});
```

### Logging Middleware

```js
function logger(req, res, next) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });
  
  next();
}

app.use(logger);
```

### Rate Limiting Middleware

```js
const rateLimit = new Map();

function rateLimiter(limit = 100, windowMs = 60000) {
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    
    if (!rateLimit.has(ip)) {
      rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    const record = rateLimit.get(ip);
    
    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
      return next();
    }
    
    if (record.count >= limit) {
      return res.status(429).json({ error: 'Too many requests' });
    }
    
    record.count++;
    next();
  };
}

app.use(rateLimiter(100, 60000));
```

## Middleware Execution Order

```js
app.use((req, res, next) => {
  console.log('1: First middleware');
  next();
});

app.use((req, res, next) => {
  console.log('2: Second middleware');
  next();
});

app.get('/', (req, res) => {
  console.log('3: Route handler');
  res.send('Hello');
});

// Output:
// 1: First middleware
// 2: Second middleware
// 3: Route handler
```

## Best Practices

1. **Always call next()** unless sending a response
2. **Order matters** - define middleware in correct sequence
3. **Keep middleware focused** - single responsibility
4. **Handle errors properly** - use error middleware
5. **Use async/await** - wrap async middleware to catch errors

```js
// Async middleware wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));
```

