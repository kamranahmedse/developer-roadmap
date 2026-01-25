Testing asynchronous code in Node.js requires special handling to ensure tests wait for async operations to complete. Different testing frameworks provide various approaches to handle promises, callbacks, and async/await.

## Testing with Jest

### Async/Await (Recommended)

```js
// Function to test
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// Test
test('fetchUser returns user data', async () => {
  const user = await fetchUser(1);
  
  expect(user).toHaveProperty('id', 1);
  expect(user).toHaveProperty('name');
});
```

### Using Promises

```js
test('fetchUser returns user data', () => {
  return fetchUser(1).then(user => {
    expect(user).toHaveProperty('id', 1);
  });
});

// Or with resolves/rejects matchers
test('fetchUser resolves with user', () => {
  return expect(fetchUser(1)).resolves.toHaveProperty('id', 1);
});

test('fetchUser rejects for invalid id', () => {
  return expect(fetchUser(-1)).rejects.toThrow('User not found');
});
```

### Testing Callbacks

```js
// Using done callback
test('callback is called with data', (done) => {
  fetchUserCallback(1, (err, user) => {
    try {
      expect(err).toBeNull();
      expect(user).toHaveProperty('id', 1);
      done();
    } catch (error) {
      done(error);
    }
  });
});
```

## Mocking Async Functions

### Mocking API Calls

```js
// userService.js
const axios = require('axios');

async function getUser(id) {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
}

// userService.test.js
jest.mock('axios');

test('getUser fetches user from API', async () => {
  const mockUser = { id: 1, name: 'John' };
  axios.get.mockResolvedValue({ data: mockUser });
  
  const user = await getUser(1);
  
  expect(axios.get).toHaveBeenCalledWith('/api/users/1');
  expect(user).toEqual(mockUser);
});

test('getUser handles errors', async () => {
  axios.get.mockRejectedValue(new Error('Network error'));
  
  await expect(getUser(1)).rejects.toThrow('Network error');
});
```

### Mocking Database Calls

```js
// userRepository.js
const db = require('./db');

async function findUserById(id) {
  return db.query('SELECT * FROM users WHERE id = ?', [id]);
}

// userRepository.test.js
jest.mock('./db');

test('findUserById queries database', async () => {
  const mockUser = { id: 1, name: 'John' };
  db.query.mockResolvedValue([mockUser]);
  
  const user = await findUserById(1);
  
  expect(db.query).toHaveBeenCalledWith(
    'SELECT * FROM users WHERE id = ?',
    [1]
  );
  expect(user).toEqual([mockUser]);
});
```

## Testing with Mocha

```js
const { expect } = require('chai');

describe('User API', () => {
  // Async/Await
  it('should fetch user', async () => {
    const user = await fetchUser(1);
    expect(user).to.have.property('id', 1);
  });
  
  // Promises
  it('should fetch user with promise', () => {
    return fetchUser(1).then(user => {
      expect(user).to.have.property('id', 1);
    });
  });
  
  // Done callback
  it('should call callback with user', (done) => {
    fetchUserCallback(1, (err, user) => {
      expect(err).to.be.null;
      expect(user).to.have.property('id', 1);
      done();
    });
  });
});
```

## Testing Timers

```js
// Function using setTimeout
function delayedGreeting(callback) {
  setTimeout(() => {
    callback('Hello!');
  }, 1000);
}

// Test with fake timers
jest.useFakeTimers();

test('calls callback after 1 second', () => {
  const callback = jest.fn();
  
  delayedGreeting(callback);
  
  expect(callback).not.toHaveBeenCalled();
  
  jest.advanceTimersByTime(1000);
  
  expect(callback).toHaveBeenCalledWith('Hello!');
});

jest.useRealTimers();
```

## Testing Event Emitters

```js
const EventEmitter = require('events');

class DataProcessor extends EventEmitter {
  async process(data) {
    this.emit('start');
    const result = await processData(data);
    this.emit('complete', result);
    return result;
  }
}

test('emits events during processing', async () => {
  const processor = new DataProcessor();
  const startHandler = jest.fn();
  const completeHandler = jest.fn();
  
  processor.on('start', startHandler);
  processor.on('complete', completeHandler);
  
  await processor.process({ value: 42 });
  
  expect(startHandler).toHaveBeenCalled();
  expect(completeHandler).toHaveBeenCalledWith(
    expect.objectContaining({ processed: true })
  );
});
```

## Testing HTTP Endpoints

```js
const request = require('supertest');
const app = require('./app');

describe('GET /api/users', () => {
  it('returns list of users', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
  
  it('creates a new user', async () => {
    const newUser = { name: 'John', email: 'john@example.com' };
    
    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(201);
    
    expect(response.body).toMatchObject(newUser);
    expect(response.body).toHaveProperty('id');
  });
});
```

## Common Pitfalls

### Forgetting to return/await

```js
// ❌ Test passes even if promise rejects!
test('bad test', () => {
  fetchUser(1).then(user => {
    expect(user.id).toBe(999); // Never executed
  });
});

// ✅ Correct - return the promise
test('good test', () => {
  return fetchUser(1).then(user => {
    expect(user.id).toBe(1);
  });
});

// ✅ Or use async/await
test('better test', async () => {
  const user = await fetchUser(1);
  expect(user.id).toBe(1);
});
```

### Timeout Issues

```js
// Increase timeout for slow operations
test('slow operation', async () => {
  const result = await slowOperation();
  expect(result).toBeDefined();
}, 10000); // 10 second timeout

// Or set globally
jest.setTimeout(10000);
```

