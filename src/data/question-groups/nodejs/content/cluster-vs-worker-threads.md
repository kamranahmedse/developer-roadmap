Node.js provides two main ways to utilize multiple CPU cores: the Cluster module and Worker Threads. Both help achieve parallelism but serve different purposes and have distinct characteristics.

## Cluster Module

Creates multiple processes (workers) that share the same server port. Each worker is a separate Node.js process with its own memory and V8 instance.

```js
import cluster from 'node:cluster';
import http from 'node:http';
import os from 'node:os';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers for each CPU
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Restart worker
  });
} else {
  // Workers share the TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello from worker ${process.pid}`);
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

## Worker Threads

Creates threads within the same process. Workers share memory (via SharedArrayBuffer) and are lighter than cluster workers.

```js
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';

if (isMainThread) {
  // Main thread
  const worker = new Worker(__filename, {
    workerData: { num: 42 }
  });

  worker.on('message', (result) => {
    console.log(`Result: ${result}`);
  });

  worker.on('error', (err) => {
    console.error('Worker error:', err);
  });

  worker.on('exit', (code) => {
    console.log(`Worker exited with code ${code}`);
  });
} else {
  // Worker thread
  const { num } = workerData;
  const result = heavyComputation(num);
  parentPort.postMessage(result);
}

function heavyComputation(n) {
  let sum = 0;
  for (let i = 0; i < n * 1000000; i++) {
    sum += i;
  }
  return sum;
}
```

## Key Differences

| Feature | Cluster | Worker Threads |
|---------|---------|----------------|
| **Isolation** | Separate processes | Same process |
| **Memory** | Separate memory | Can share memory |
| **Communication** | IPC (slower) | Message passing + SharedArrayBuffer |
| **Use Case** | HTTP servers | CPU-intensive tasks |
| **Overhead** | Higher (new process) | Lower (new thread) |
| **Crash Impact** | Worker crash is isolated | Can affect main thread |

## When to Use Cluster

Best for scaling HTTP servers across CPU cores:

```js
import cluster from 'node:cluster';
import os from 'node:os';

// Use with PM2 (recommended for production)
// pm2 start app.js -i max

// Or manually with cluster
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  app.listen(3000);
}
```

## When to Use Worker Threads

Best for CPU-intensive operations without blocking the event loop:

```js
// main.js
import { Worker } from 'node:worker_threads';

function runWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', { workerData: data });
    worker.on('message', resolve);
    worker.on('error', reject);
  });
}

// Process image without blocking server
app.post('/process-image', async (req, res) => {
  const result = await runWorker({ image: req.body.image });
  res.json(result);
});
```

```js
// worker.js
import { workerData, parentPort } from 'node:worker_threads';

// Heavy image processing
const result = processImage(workerData.image);
parentPort.postMessage(result);
```

## Sharing Memory with Worker Threads

```js
// Main thread
import { Worker } from 'node:worker_threads';

const sharedBuffer = new SharedArrayBuffer(4);
const sharedArray = new Int32Array(sharedBuffer);

const worker = new Worker('./worker.js', {
  workerData: { sharedBuffer }
});

// Both can read/write to sharedArray
Atomics.store(sharedArray, 0, 100);

// Worker thread
import { workerData } from 'node:worker_threads';
const sharedArray = new Int32Array(workerData.sharedBuffer);
console.log(Atomics.load(sharedArray, 0)); // 100
```

## Best Practices

1. **Use Cluster for HTTP servers** - Easy horizontal scaling
2. **Use Worker Threads for CPU work** - Image processing, parsing, calculations
3. **Don't overuse workers** - Thread pool size should match CPU cores
4. **Handle errors properly** - Workers can crash independently
5. **Consider PM2** - Production-ready process management for clusters

