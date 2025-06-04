# Streams

AWS DynamoDB Streams is a time-ordered sequence of item-level modifications in any DynamoDB table. When you enable a stream on a table, DynamoDB captures information about every modification to data items in the table. The changes are recorded in near real-time and can be set up to trigger AWS Lambda functions immediately after an event has occurred. With DynamoDB Streams, applications can access this log and view the data modifications in the order they occurred. The stream records item-level data modifications such as `Insert`, `Modify`, and `Remove`. Each stream record is then organized into a stream view type, where applications can access up to 24 hours of data modification history.

Visit the following resources to learn more:

- [@official@Streams](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.Lambda.html)
