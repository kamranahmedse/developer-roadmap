# Write-behind

In write-behind, the application does the following:

- Add/update entry in cache
- Asynchronously write entry to the data store, improving write performance

## Disadvantages of write-behind:

- There could be data loss if the cache goes down prior to its contents hitting the data store.
- It is more complex to implement write-behind than it is to implement cache-aside or write-through.

To learn more, visit the following links:

- [Getting started with Write-behind](https://github.com/donnemartin/system-design-primer#Write-behind)