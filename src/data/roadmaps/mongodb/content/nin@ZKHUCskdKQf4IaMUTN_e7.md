# $nin

The $nin (not in) operator in MongoDB selects documents where a field value does not match any value in a specified array. It's the logical opposite of $in and excludes documents with field values present in the given array. $nin is useful for filtering out unwanted values, excluding specific categories, and creating blacklist-style queries.