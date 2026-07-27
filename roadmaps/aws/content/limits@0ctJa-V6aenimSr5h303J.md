# Limits

In terms of DynamoDB, it’s important to be aware of certain limits. There are two types of capacity modes - provisioned and on-demand, with varying read/write capacity units. You have control over the provisioning of throughput for read/write operations. However, there's a maximum limit of 40000 read capacity units and 40000 write capacity units for on-demand mode per table. It's also important to note that the partition key value and sort key value can be a maximum of 2048 bytes and 1024 bytes respectively. Each item, including primary key, can be a maximum of 400KB. The total provisioned throughput for all tables and global secondary indexes in a region cannot exceed 20,000 write capacity units and 20000 read capacity units for on-demand mode. Remember, you can request to increase these limits by reaching out to AWS Support.

Visit the following resources to learn more:

- [@official@Limit Settings](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ServiceQuotas.html)
