# $unwind

The $unwind aggregation stage deconstructs array fields, creating separate documents for each array element. It's essential for processing documents with embedded arrays by flattening them into individual records. $unwind supports options for preserving null/empty arrays and including array indices, enabling detailed analysis of array-based data structures and normalization workflows.