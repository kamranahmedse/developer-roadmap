# Refresh-ahead

You can configure the cache to automatically refresh any recently accessed cache entry prior to its expiration.

Refresh-ahead can result in reduced latency vs read-through if the cache can accurately predict which items are likely to be needed in the future.

## Disadvantage of refresh-ahead:

- Not accurately predicting which items are likely to be needed in the future can result in reduced performance than without refresh-ahead.

![](https://i.imgur.com/sBXb7lb.png)

To learn more, visit the following links:

- [@article@From cache to in-memory data grid](http://www.slideshare.net/tmatyashovsky/from-cache-to-in-memory-data-grid-introduction-to-hazelcast)
