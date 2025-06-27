# $match

The $match aggregation stage filters documents in the pipeline, similar to the find() query operation. It should be placed early in the pipeline to reduce document count and improve performance. $match supports all query operators and can use indexes when positioned at the beginning of the pipeline, making it essential for efficient data filtering in aggregation workflows.