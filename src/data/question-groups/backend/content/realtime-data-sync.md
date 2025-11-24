If you want to support real-time data synchronization, you’ll have to find a way to create stable and efficient communication channels between devices and find a way to solve potential data sync conflicts when several devices are trying to change the same record.

So, for communication channels, you can use one of the following:

- Socket-based bidirectional channels that allow for real-time data exchange.
- Using a pub/sub model to efficiently distribute data between multiple devices. You can use something like Redis or Kafka for this one.

For data conflict resolutions, you can use algorithms like Operational Transformation (OT) or [Conflict-Free Replicated Data Types](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) (CRDTs).