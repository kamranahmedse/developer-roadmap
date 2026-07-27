# Configuring Save Interval

Configuring the save interval in Redis controls how often data is saved from memory to disk (RDB snapshots). This is done using the `save` directive in the `redis.conf` file. You can specify multiple save intervals with different thresholds, for example: `save 900 1` saves the dataset if at least one key is changed within 900 seconds. Redis allows configuring multiple save intervals, offering flexibility between performance and data durability based on your use case.

Learn more from the following resources:

- [@official@Redis Persistence](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/)
- [@video@Understanding Redis Persistence](https://www.youtube.com/watch?v=1pfvz24BAUs)