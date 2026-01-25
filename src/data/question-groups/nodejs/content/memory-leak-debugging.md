Memory leaks in Node.js occur when the application retains references to objects that are no longer needed, preventing garbage collection from freeing memory. Identifying and fixing these leaks is crucial for long-running applications.

## Common Causes of Memory Leaks

### 1. Unremoved Event Listeners

```js
// ❌ Memory leak: listeners accumulate
function handleRequest(req, res) {
  req.on('data', (chunk) => {
    // Process data
  });
  // Listener never removed!
}

// ✅ Fixed: Remove listeners when done
function handleRequest(req, res) {
  const onData = (chunk) => {
    // Process data
  };
  req.on('data', onData);
  
  res.on('finish', () => {
    req.removeListener('data', onData);
  });
}
```

### 2. Global Variables

```js
// ❌ Memory leak: data keeps growing
const cache = {};

function processRequest(id, data) {
  cache[id] = data; // Never cleaned up
}

// ✅ Fixed: Use LRU cache with size limit
const LRU = require('lru-cache');
const cache = new LRU({ max: 500 });

function processRequest(id, data) {
  cache.set(id, data);
}
```

### 3. Closures Holding References

```js
// ❌ Memory leak: closure retains largeData
function createHandler() {
  const largeData = new Array(1000000).fill('x');
  
  return function handler(req, res) {
    // largeData is retained even if not used
    res.send('OK');
  };
}

// ✅ Fixed: Don't capture unnecessary variables
function createHandler() {
  return function handler(req, res) {
    res.send('OK');
  };
}
```

### 4. Timers Not Cleared

```js
// ❌ Memory leak: interval never cleared
function startPolling() {
  setInterval(() => {
    fetchData();
  }, 1000);
}

// ✅ Fixed: Clear interval when done
function startPolling() {
  const intervalId = setInterval(() => {
    fetchData();
  }, 1000);
  
  return () => clearInterval(intervalId);
}
```

## Debugging Tools

### 1. Node.js Inspector (Chrome DevTools)

```bash
# Start with inspector
node --inspect app.js

# Or attach to running process
node --inspect=9229 app.js
```

Then open `chrome://inspect` in Chrome and take heap snapshots.

### 2. process.memoryUsage()

```js
// Monitor memory in application
setInterval(() => {
  const usage = process.memoryUsage();
  console.log({
    heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)}MB`,
    heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)}MB`,
    external: `${Math.round(usage.external / 1024 / 1024)}MB`,
    rss: `${Math.round(usage.rss / 1024 / 1024)}MB`
  });
}, 5000);
```

### 3. Heap Snapshots Programmatically

```js
const v8 = require('v8');
const fs = require('fs');

function takeHeapSnapshot() {
  const snapshotFile = `heap-${Date.now()}.heapsnapshot`;
  const stream = fs.createWriteStream(snapshotFile);
  v8.writeHeapSnapshot(snapshotFile);
  console.log(`Heap snapshot written to ${snapshotFile}`);
}

// Take snapshot on SIGUSR2
process.on('SIGUSR2', takeHeapSnapshot);
```

### 4. Using clinic.js

```bash
# Install
npm install -g clinic

# Profile for memory issues
clinic doctor -- node app.js
clinic heapprofiler -- node app.js
```

## Detection Pattern

```js
// Simple leak detection
const initialMemory = process.memoryUsage().heapUsed;

setInterval(() => {
  const currentMemory = process.memoryUsage().heapUsed;
  const growth = currentMemory - initialMemory;
  
  if (growth > 50 * 1024 * 1024) { // 50MB growth
    console.warn('Possible memory leak detected!');
    console.log(`Memory grew by ${Math.round(growth / 1024 / 1024)}MB`);
  }
}, 30000);
```

## Best Practices to Prevent Leaks

1. **Always remove event listeners** when they're no longer needed
2. **Use WeakMap/WeakSet** for caches tied to object lifetime
3. **Set limits on caches and queues**
4. **Clear timeouts and intervals**
5. **Monitor memory in production** with APM tools
6. **Regular load testing** to catch leaks early

```js
// Example: WeakMap for metadata
const metadata = new WeakMap();

function attachMetadata(obj, data) {
  metadata.set(obj, data);
  // When obj is garbage collected, metadata entry is too
}
```

