# Cache-aside

The application is responsible for reading and writing from storage. The cache does not interact with storage directly. The application does the following:

- Look for entry in cache, resulting in a cache miss
- Load entry from the database
- Add entry to cache
- Return entry

```python
def get_user(self, user_id):
  user = cache.get("user.{0}", user_id)
  if user is None:
    user = db.query("SELECT * FROM users WHERE user_id = {0}", user_id)
      if user is not None:
        key = "user.{0}".format(user_id)
        cache.set(key, json.dumps(user))
  return user
```

[Memcached](https://memcached.org/) is generally used in this manner. Subsequent reads of data added to cache are fast. Cache-aside is also referred to as lazy loading. Only requested data is cached, which avoids filling up the cache with data that isn't requested.

![Cache Aside](https://i.imgur.com/Ujf0awN.png)

To learn more, have a look at the following resources:

- [@article@From cache to in-memory data grid](https://www.slideshare.net/tmatyashovsky/from-cache-to-in-memory-data-grid-introduction-to-hazelcast)
