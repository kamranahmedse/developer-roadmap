Security is critical for Node.js applications, especially those handling sensitive data or exposed to the internet. Here are the most common vulnerabilities and how to prevent them.

## 1. SQL Injection Prevention

Never concatenate user input directly into queries.

```js
// ❌ Vulnerable to SQL injection
const query = `SELECT * FROM users WHERE id = ${req.params.id}`;
db.query(query);

// ✅ Use parameterized queries
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [req.params.id]);

// ✅ With an ORM (Sequelize)
const user = await User.findOne({
  where: { id: req.params.id }
});
```

## 2. NoSQL Injection Prevention

```js
// ❌ Vulnerable - user can pass { $gt: "" }
const user = await User.findOne({
  username: req.body.username,
  password: req.body.password
});

// ✅ Validate and sanitize input
const { username, password } = req.body;

if (typeof username !== 'string' || typeof password !== 'string') {
  return res.status(400).json({ error: 'Invalid input' });
}

const user = await User.findOne({
  username: username.toString(),
  password: password.toString()
});
```

## 3. XSS (Cross-Site Scripting) Prevention

```js
// ❌ Vulnerable - renders user input as HTML
app.get('/profile', (req, res) => {
  res.send(`<h1>Hello ${req.query.name}</h1>`);
});

// ✅ Escape HTML entities
import escapeHtml from 'escape-html';

app.get('/profile', (req, res) => {
  res.send(`<h1>Hello ${escapeHtml(req.query.name)}</h1>`);
});

// ✅ Use Content Security Policy
import helmet from 'helmet';
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
  }
}));
```

## 4. Using Helmet.js

Helmet sets various HTTP headers to secure your app.

```js
import helmet from 'helmet';
import express from 'express';
const app = express();

// Use all default protections
app.use(helmet());

// Or configure individually
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
```

## 5. Rate Limiting

Prevent brute force and DDoS attacks.

```js
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: 'Too many requests, please try again later'
});

app.use('/api/', limiter);

// Stricter limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: 'Too many login attempts'
});

app.use('/api/login', authLimiter);
```

## 6. Secure Authentication

```js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

// Verify passwords
const verifyPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Use HTTP-only cookies for tokens
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 3600000
});
```

## 7. Input Validation

```js
import Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)/).required()
});

app.post('/register', async (req, res) => {
  try {
    const validated = await userSchema.validateAsync(req.body);
    // Process validated data
  } catch (err) {
    res.status(400).json({ error: err.details[0].message });
  }
});
```

## 8. Secure Environment Variables

```js
// ❌ Never hardcode secrets
const JWT_SECRET = 'mysecret123';

// ✅ Use environment variables
import 'dotenv/config';
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Validate required env vars at startup
const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL', 'API_KEY'];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`Missing required env var: ${varName}`);
    process.exit(1);
  }
});
```

## 9. HTTPS and Secure Cookies

```js
// Force HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      return res.redirect(`https://${req.header('host')}${req.url}`);
    }
    next();
  });
}

// Secure session configuration
import session from 'express-session';

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  }
}));
```

## Security Checklist

- ✅ Use parameterized queries (prevent SQL injection)
- ✅ Validate and sanitize all user input
- ✅ Use Helmet.js for security headers
- ✅ Implement rate limiting
- ✅ Hash passwords with bcrypt (salt rounds ≥ 12)
- ✅ Use HTTPS in production
- ✅ Store secrets in environment variables
- ✅ Keep dependencies updated
- ✅ Use HTTP-only, secure cookies
- ✅ Implement proper CORS policies

