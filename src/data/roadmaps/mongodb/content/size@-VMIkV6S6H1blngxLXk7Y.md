# $size

The $size operator in MongoDB matches documents where an array field has exactly the specified number of elements. It only works with arrays and requires an exact count match, not range queries. $size is useful for validating array lengths, filtering documents by array dimensions, and ensuring data consistency in array-based document structures.