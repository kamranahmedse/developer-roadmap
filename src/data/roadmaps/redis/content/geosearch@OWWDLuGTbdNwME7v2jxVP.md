# GEOSEARCH

The `GEOSEARCH` command in Redis is used to query geospatial data by finding members within a specified geographic area. It allows you to search for entries based on a central point (latitude and longitude) and a defined radius, or by bounding box coordinates. The command returns a sorted set of members that fall within the specified geographical range, making it ideal for applications that require proximity searches, such as locating nearby businesses or services. `GEOSEARCH` can also be combined with various options, such as sorting results by distance or limiting the number of results returned.

Learn more from the following resources:

- [@official@GEOADD](https://redis.io/docs/latest/commands/geoadd/)
- [@article@Getting Started with Geospatial Search in Redis](https://redis.io/learn/howtos/solutions/geo/getting-started)