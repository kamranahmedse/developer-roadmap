Optimizing Node.js performance involves understanding the event loop, efficient resource usage, and applying best practices for handling I/O operations, memory, and CPU-intensive tasks.

## 1. Avoid Blocking the Event Loop

```js
// ❌ Blocking - freezes the server
app.get('/hash', (req, res) => {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
  res.send(hash);
});

// ✅ Non-blocking - uses thread pool
app.get('/hash', (req, res) => {
  crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, hash) => {
    res.send(hash);
  });
});
```

## 2. Use Caching Effectively

### In-Memory Caching

```js
import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 600 }); // 10 min TTL

async function getUserData(userId) {
  // Check cache first
  const cached = cache.get(`user:${userId}`);
  if (cached) return cached;
  
  // Fetch from database
  const user = await db.users.findById(userId);
  
  // Store in cache
  cache.set(`user:${userId}`, user);
  
  return user;
}
```

### Redis Caching

```js
import Redis from 'ioredis';
const redis = new Redis();

async function getCachedData(key, fetchFn, ttl = 3600) {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  
  const data = await fetchFn();
  await redis.setex(key, ttl, JSON.stringify(data));
  
  return data;
}

// Usage
const products = await getCachedData(
  'products:all',
  () => db.products.findAll(),
  3600
);
```

## 3. Database Query Optimization

```js
// ❌ N+1 Query Problem
const users = await User.findAll();
for (const user of users) {
  user.posts = await Post.findAll({ where: { userId: user.id } });
}

// ✅ Eager loading - single query with JOIN
const users = await User.findAll({
  include: [{ model: Post }]
});

// ✅ Use indexes
// In your migration:
await queryInterface.addIndex('posts', ['userId']);
await queryInterface.addIndex('posts', ['createdAt']);

// ✅ Select only needed fields
const users = await User.findAll({
  attributes: ['id', 'name', 'email'] // Don't select everything
});

// ✅ Pagination
const users = await User.findAll({
  limit: 20,
  offset: (page - 1) * 20
});
```

## 4. Use Streams for Large Data

```js
// ❌ Loads entire file in memory
app.get('/download', async (req, res) => {
  const data = await fs.promises.readFile('large-file.csv');
  res.send(data);
});

// ✅ Stream the file
app.get('/download', (req, res) => {
  const stream = fs.createReadStream('large-file.csv');
  res.setHeader('Content-Type', 'text/csv');
  stream.pipe(res);
});

// ✅ Stream database results
app.get('/export', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.write('[');
  
  let first = true;
  const cursor = User.find().cursor();
  
  for await (const user of cursor) {
    if (!first) res.write(',');
    res.write(JSON.stringify(user));
    first = false;
  }
  
  res.write(']');
  res.end();
});
```

## 5. Connection Pooling

```js
// PostgreSQL with pg
import { Pool } from 'pg';

const pool = new Pool({
  max: 20, // Max connections in pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Reuse connections from pool
app.get('/users', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
  } finally {
    client.release(); // Return to pool
  }
});
```

## 6. Compression

```js
import compression from 'compression';

// Basic compression (uses sensible defaults)
app.use(compression());

// With custom options
app.use(compression({
  level: 6, // Compression level (1-9)
  threshold: 1024, // Only compress if > 1KB
}));

// Custom filter to skip compression for certain requests
app.use(compression({
  filter: (req, res) => {
    // Skip compression if client requests it
    if (req.headers['x-no-compression']) return false;
    
    // Fallback to the default compression filter behavior
    return compression.filter(req, res);
  }
}));
```

## 7. Use Clustering

```js
import cluster from 'node:cluster';
import os from 'node:os';

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Restart
  });
} else {
  await import('./app.js'); // Your Express app
}

// Or use PM2 (recommended)
// pm2 start app.js -i max
```

## 8. Optimize JSON Operations

```js
// ❌ Slow for large objects
const data = JSON.parse(largeJsonString);

// ✅ Use streaming JSON parser
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray.js';

fs.createReadStream('large.json')
  .pipe(parser())
  .pipe(streamArray())
  .on('data', ({ value }) => {
    // Process each item
  });

// ✅ Use faster JSON libraries
import fastJson from 'fast-json-stringify';

const stringify = fastJson({
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' }
  }
});

const json = stringify({ id: 1, name: 'John' }); // Faster than JSON.stringify
```

## 9. Monitoring and Profiling

```js
// Monitor event loop lag
const start = process.hrtime();
setImmediate(() => {
  const delta = process.hrtime(start);
  const lag = (delta[0] * 1e9 + delta[1]) / 1e6;
  if (lag > 100) {
    console.warn(`Event loop lag: ${lag}ms`);
  }
});

// Memory monitoring
setInterval(() => {
  const used = process.memoryUsage();
  console.log({
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024)}MB`,
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024)}MB`
  });
}, 30000);
```

## Performance Checklist

- ✅ Use async/await and don't block event loop
- ✅ Implement caching (Redis, in-memory)
- ✅ Optimize database queries (indexes, eager loading)
- ✅ Use streams for large data
- ✅ Enable compression
- ✅ Use connection pooling
- ✅ Cluster your application
- ✅ Monitor performance metrics
- ✅ Profile and identify bottlenecks

