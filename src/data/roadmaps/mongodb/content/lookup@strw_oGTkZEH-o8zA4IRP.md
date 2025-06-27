# $lookup

The $lookup aggregation stage performs left outer joins between collections, similar to SQL JOINs. It adds an array field containing matching documents from the "joined" collection based on specified local and foreign fields. $lookup supports pipeline-based lookups for complex matching conditions and enables denormalization of related data for efficient querying and reporting.