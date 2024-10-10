# Bitmaps

In Redis, Bitmaps are a data structure that allows you to manipulate individual bits within a string value. While Redis doesn't have a native "bitmap" data type, it uses strings to represent bitmaps. The power of bitmaps comes from their ability to perform operations on binary data at the bit level, making them extremely memory-efficient for certain types of applications, like tracking the presence/absence of elements (such as daily active users, features, etc.).

Learn more from the following resources:

- [@official@Redis Bitmap docs](https://redis.io/docs/latest/develop/data-types/bitmaps/)
- [@video@Redis bitmap explained](https://youtu.be/oj8LdJQjhJo?si=jem54LfPbZtrpnEP)
