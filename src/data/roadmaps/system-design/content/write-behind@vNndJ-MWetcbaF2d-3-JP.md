# Write-behind

In write-behind, the application does the following:

- Add/update entry in cache
- Asynchronously write entry to the data store, improving write performance

## Disadvantages of write-behind:

- There could be data loss if the cache goes down prior to its contents hitting the data store.
- It is more complex to implement write-behind than it is to implement cache-aside or write-through.

![Scalability, availability, stability, patterns](https://i.imgur.com/XDsb7RS.png)

To learn more, visit the following links:

- [@article@Scalability, availability, stability, patterns](http://www.slideshare.net/jboner/scalability-availability-stability-patterns/)
