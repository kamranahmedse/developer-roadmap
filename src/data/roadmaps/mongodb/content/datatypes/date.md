# Date

In MongoDB, the _Date_ datatype is used to store the date and time values in a specific format. This is essential when working with date-based data, such as recording timestamps, scheduling events, or organizing data based on time.

## Date Format

MongoDB internally stores dates as the number of milliseconds since the Unix epoch (January 1, 1970). This BSON data format makes it efficient for storing and querying date values. However, when working with dates in your application, it is common to use a human-readable format such as ISO 8601.

## Working with Date

To create a new Date instance, you can use the JavaScript `Date` object. Here's an example:

```javascript
const currentDate = new Date();
```

When inserting a document with a Date field, you can store the date value as follows:

```javascript
db.events.insertOne({ title: 'Sample Event', eventDate: new Date() });
```

You can also store the current date and time using MongoDB's `$currentDate` operator when updating a document:

```javascript
db.events.updateOne(
  { _id: ObjectId('your_document_id') },
  {
    $set: {
      title: 'Sample Event',
      eventDate: { $currentDate: { $type: 'date' } }
    }
  }
);
```

## Querying Dates

To query documents based on date values, you can perform comparisons using various query operators such as `$lt`, `$lte`, `$gt`, `$gte`, and `$eq`. Here are some examples:

```javascript
// Find events that are happening before a certain date
const filterDate = new Date('2021-12-31');
db.events.find({ eventDate: { $lt: filterDate } });

// Find events that are happening after a certain date
const filterDate = new Date('2022-01-01');
db.events.find({ eventDate: { $gt: filterDate } });
```

## Date Aggregations

MongoDB also provides aggregation functions for working with date values. Some common operations include `$year`, `$month`, `$dayOfMonth`, `$hour`, and `$minute`.

Example using the `$dayOfYear` and `$year` operators:

```javascript
db.events.aggregate([
  {
    $group: {
      _id: {
        year: { $year: '$eventDate' },
        day: { $dayOfYear: '$eventDate' },
      },
      count: { $sum: 1 },
    },
  },
]);
```

This query groups events by the day and year, providing a count of events for each day.

- [@official@MongoDB Documentation Date](https://www.mongodb.com/docs/manual/reference/method/Date/)
