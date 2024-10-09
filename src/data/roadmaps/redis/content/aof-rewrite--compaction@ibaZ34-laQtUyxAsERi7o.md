# AOF rewrite & compaction

Persistence refers to the writing of data to durable storage, such as a solid-state disk (SSD). Redis provides a range of persistence options of which AOF (Append Only File) is one of the options. AOF persistence logs every write operation received by the server. These operations can then be replayed again at server startup, reconstructing the original dataset.The rewrite will create a small optimized version of the current Append Only File. 

Learn more from the following resources:

- [@official@Persistence in Redis](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/)
- [@video@Enabling Redis persistence](https://youtu.be/qBKnUeR0p10?si=TPvcFtpFMcTZB-Be)
