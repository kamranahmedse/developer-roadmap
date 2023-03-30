# Geospatial

Geospatial indexes are used for querying geospatial coordinate data in MongoDB. These indexes are helpful when you want to store information related to spatial or geographical objects, like the location of restaurants, hotels, or landmarks, and perform queries based on proximity or containment.

MongoDB supports two types of geospatial indexes: **2dsphere** and **2d**.

## 2dsphere Index

The `2dsphere` index supports queries on the surface of a sphere or a round object, like Earth. It uses the GeoJSON format for storing the geospatial data such as `Point`, `LineString`, and `Polygon`.

To create a 2dsphere index, you can use the `createIndex` method:

```javascript
db.collection.createIndex({ location: '2dsphere' });
```

In this example, the `location` field contains the GeoJSON representation of the geospatial data.

Some common queries using the 2dsphere index include:

- `$geoIntersects`: Find geometries that intersect with the specified GeoJSON geometry.
- `$geoWithin`: Find geometries contained within the specified GeoJSON geometry.
- `$nearSphere`: Find geometries that are near a given point.

## 2d Index

The `2d` index supports queries on a flat Cartesian plane, which can be useful for simpler cases when dealing with small scale data. It stores geospatial data as legacy coordinate pairs.

To create a 2d index, you can use the `createIndex` method:

```javascript
db.collection.createIndex({ location: '2d' });
```

In this example, the `location` field contains a coordinate pair [x, y].

Some common queries using the 2d index include:

- `$geoWithin`: Find geometries contained within the specified boundary.
- `$center`: Find geometries that are near a given point within a given radius.

Keep in mind that the 2d index has some limitations. It doesn't support queries for data spanning the 180-degree meridian (e.g., data wrapping around the Earth), and it cannot handle queries involving measurements or distances in greater depths.

To sum up, geospatial indexes in MongoDB are essential for querying and analyzing geospatial coordinate data. By choosing the correct index type and querying methods, you can efficiently perform location-based queries in your application.
