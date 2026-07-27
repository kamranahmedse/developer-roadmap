# Geospatial Indexes

Geospatial indexes in Redis are used to efficiently store and query location-based data, enabling fast geospatial operations. Redis uses a sorted set data structure to maintain these indexes, where each member represents a geographic location identified by longitude and latitude coordinates. The coordinates are encoded into a single value, allowing Redis to perform operations like adding locations (`GEOADD`), searching for nearby locations (`GEOSEARCH`), and calculating distances (`GEODIST`). This indexing mechanism allows for rapid retrieval of geospatial data, making it suitable for applications such as mapping services, location tracking, and proximity-based searches.

Learn more from the following resources:

- [@official@Geospatial Indexing](https://redis.io/docs/latest/develop/interact/search-and-query/indexing/geoindex/)
- [@article@Geospatial Indexes in Redis](https://codesignal.com/learn/courses/redis-data-structures-beyond-basics/lessons/introduction-to-geospatial-indexes-in-redis-using-java)