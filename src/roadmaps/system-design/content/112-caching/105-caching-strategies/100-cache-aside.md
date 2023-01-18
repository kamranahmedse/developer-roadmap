# Cache-aside


The application is responsible for reading and writing from storage. The cache does not interact with storage directly. The application does the following:

- Look for entry in cache, resulting in a cache miss
- Load entry from the database
- Add entry to cache
- Return entry

Memcached is generally used in this manner. Subsequent reads of data added to cache are fast. Cache-aside is also referred to as lazy loading. Only requested data is cached, which avoids filling up the cache with data that isn't requested.

Learn more from the following links:

- [Getting started with Cache-aside](https://github.com/donnemartin/system-design-primer#cache-aside)
- [What is Memcached?](https://memcached.org/)