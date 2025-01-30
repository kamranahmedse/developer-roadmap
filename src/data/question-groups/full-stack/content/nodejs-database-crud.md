In general terms, connecting to a database using Node.js requires the following steps:

1. Install the DB driver.  
2. Use the driver to connect to the database.  
3. Use the returned connection object to send requests.

Of course, depending on the database engine you decide to go with, there might be some slight changes to those steps.  
However, if we think about either MongoDB or PostgreDB, let’s take a look at how to interact with them through Node.js:

##### Install the Database Driver

The first thing you gotta do, is install either the driver which will let you directly interact with the database, or an ORM, which will abstract that connection and give you a higher-level layer of abstraction.   
Use the appropriate driver for your database.

* For MongoDB: `npm install mongoose`  
* For PostgreSQL: `npm install pg`

##### Connect to the database

Now to connect to the actual database, you’ll have to adapt the code based on the connection method you’re using. Let’s take a closer look at how to connect either to MongoDB or PostgreDB.

**MongoDB**:  

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
```

**PostgreSQL**:  

```javascript
const { Pool } = require('pg');
const pool = new Pool({ user: 'user', host: 'localhost', database: 'mydb', password: 'password', port: 5432 });
```

##### Perform CRUD Operations

For the CRUD (Create, Read, Update & Delete), the code is going to change based on the technology you’re using. Here in our examples, we have one that’s using an ORM which means we have an abstraction layer on top of the native query language, and then we also have a simple SQL driver, which means we have to directly write SQL queries.

**Create operation**:

**MongoDB**:  

```javascript
const User = mongoose.model('User', { name: String });
User.create({ name: 'John Doe' });
```

**PostgreSQL**:  

```javascript
pool.query('INSERT INTO users (name) VALUES ($1)', ['John Doe']);
```

**Read operation**:

**MongoDB**:  

```javascript
User.find({}, (err, users) => console.log(users));
```

**PostgreSQL**:  

```javascript
pool.query('SELECT * FROM users', (err, res) => console.log(res.rows));
```

**Update operation**:

**MongoDB**:  

```javascript
User.updateOne({ name: 'John Doe' }, { name: 'Jane Doe' });
```

**PostgreSQL**:  

```javascript
pool.query('UPDATE users SET name = $1 WHERE name = $2', ['Jane Doe', 'John Doe']);
```

**Delete operation**:

**MongoDB**:  

```javascript
User.deleteOne({ name: 'Jane Doe' });
```

**PostgreSQL**:  

```javascript
pool.query('DELETE FROM users WHERE name = $1', ['Jane Doe']);
```
