Streams are collections of data that might not be available all at once and don't have to fit in memory. They're perfect for handling large files or data that comes from an external source piece by piece. Buffers are temporary storage for binary data.

## Four Types of Streams

### 1. Readable Streams
Data source that you can read from.

```js
const fs = require('fs');

const readable = fs.createReadStream('large-file.txt', {
  highWaterMark: 16 * 1024 // 16KB chunks
});

readable.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes`);
});

readable.on('end', () => {
  console.log('Finished reading');
});
```

### 2. Writable Streams
Destination that you can write data to.

```js
const writable = fs.createWriteStream('output.txt');

writable.write('Hello ');
writable.write('World!');
writable.end(); // Signal no more data

writable.on('finish', () => {
  console.log('Write completed');
});
```

### 3. Duplex Streams
Both readable and writable (e.g., TCP sockets).

```js
const net = require('net');

const server = net.createServer((socket) => {
  // socket is a duplex stream
  socket.on('data', (data) => {
    socket.write(`Echo: ${data}`);
  });
});
```

### 4. Transform Streams
Modify data as it passes through.

```js
const { Transform } = require('stream');

const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

process.stdin.pipe(upperCase).pipe(process.stdout);
```

## Buffer vs Reading Entire File

```js
// ❌ Bad: Loads entire file in memory
const data = fs.readFileSync('large-file.txt');
console.log(data.length); // Could crash with large files

// ✅ Good: Streams process chunks
const stream = fs.createReadStream('large-file.txt');
let size = 0;
stream.on('data', (chunk) => {
  size += chunk.length;
});
stream.on('end', () => {
  console.log(`Total size: ${size}`);
});
```

## Piping Streams

Chain streams together for powerful data processing:

```js
const zlib = require('zlib');

// Compress a file using streams
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'))
  .on('finish', () => console.log('Compression complete'));
```

## Handling Backpressure

When writable stream can't keep up with readable stream:

```js
const readable = fs.createReadStream('source.txt');
const writable = fs.createWriteStream('dest.txt');

readable.on('data', (chunk) => {
  const canContinue = writable.write(chunk);
  
  if (!canContinue) {
    // Pause reading until drain event
    readable.pause();
    writable.once('drain', () => {
      readable.resume();
    });
  }
});
```

## When to Use Streams

| Use Streams When | Use Buffer When |
|-----------------|-----------------|
| Large files (>100MB) | Small files (<10MB) |
| Real-time data processing | Need entire data at once |
| Memory is limited | Simple operations |
| Network I/O | Data fits in memory |

## Working with Buffers

```js
// Create buffer
const buf1 = Buffer.alloc(10); // 10 bytes, filled with zeros
const buf2 = Buffer.from('Hello');
const buf3 = Buffer.from([72, 101, 108, 108, 111]);

// Read/Write
buf1.write('Hi');
console.log(buf2.toString()); // 'Hello'

// Concatenate
const combined = Buffer.concat([buf2, Buffer.from(' World')]);
console.log(combined.toString()); // 'Hello World'
```

