# Buffered Streams

Buffered streams in Kotlin enhance the efficiency of reading from and writing to data sources. Instead of directly interacting with the underlying input or output stream for every read or write operation, buffered streams use an internal buffer. This buffer temporarily stores data, reducing the number of actual I/O operations and improving performance, especially when dealing with small, frequent read/write requests.

Visit the following resources to learn more:

- [@article@https://developer.android.com/reference/kotlin/java/io/BufferedInputStream](https://developer.android.com/reference/kotlin/java/io/BufferedInputStream)
- [@article@BufferedOutputStream](https://developer.android.com/reference/kotlin/java/io/BufferedOutputStream)
- [@video@Efficient IO With Buffered Reading & Writing In Kotlin - IO Essentials](https://www.youtube.com/watch?v=GFo5KPaY-zU)