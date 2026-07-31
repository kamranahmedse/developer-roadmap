# Star vs Snowflake Schema
 
A star schema connects a central fact table directly to each dimension table, keeping dimensions flat and denormalized. A snowflake schema instead breaks dimensions into further related sub-tables, normalizing them, which adds extra joins the model has to traverse. Star schema is generally preferred in Power BI because it performs better and simplifies DAX writing.