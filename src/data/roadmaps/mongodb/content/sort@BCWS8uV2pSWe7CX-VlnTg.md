# $sort

The $sort aggregation stage orders documents by specified field values in ascending (1) or descending (-1) order. It can sort by multiple fields with different directions and supports sorting by computed values from previous pipeline stages. Placing $sort early in the pipeline can leverage indexes for better performance, while late sorting applies to aggregated results.