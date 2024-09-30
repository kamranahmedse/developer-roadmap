# PFADD

`PFADD` is a Redis command used to add elements to a HyperLogLog data structure, which is designed for estimating the cardinality (number of unique elements) of a dataset. When elements are added using `PFADD`, Redis updates the internal structure without storing the actual elements, ensuring low memory consumption. This command returns `1` if the HyperLogLog was modified (i.e., a new unique element was added) and `0` otherwise. `PFADD` is ideal for use cases like counting unique visits or tracking unique events in a highly memory-efficient manner.

Learn more from the following resources:

