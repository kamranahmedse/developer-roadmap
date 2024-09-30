# SADD

`SADD` is a Redis command used to add one or more members to a set. If the set does not already exist, it is created automatically before the members are added. The command returns the number of elements that were added to the set, excluding any members that were already present, ensuring that sets maintain their unique membership property. `SADD` is useful for scenarios requiring membership testing, such as tracking unique users, items, or features, as sets inherently do not allow duplicate values. This atomic operation is efficient and well-suited for high-concurrency environments, making it a powerful tool for managing collections of unique items in Redis.

Learn more from the following resources:

