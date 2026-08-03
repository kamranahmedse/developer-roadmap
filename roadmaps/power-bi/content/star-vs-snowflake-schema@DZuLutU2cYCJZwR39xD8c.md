# Star vs Snowflake Schema

A star schema connects a central fact table directly to each dimension table, keeping dimensions flat and denormalized. A snowflake schema instead breaks dimensions into further related sub-tables, normalizing them, which adds extra joins the model has to traverse. Star schema is generally preferred in Power BI because it performs better and simplifies DAX writing.

Visit the following resources to learn more:

- [@official@Understand star schema and the importance for Power BI](https://learn.microsoft.com/en-us/power-bi/guidance/star-schema)
- [@article@Power BI Data Modeling: Star vs Snowflake Schema](https://www.hexstream.com/tech-corner/power-bi-data-modeling-star-vs-snowflake-schema)
- [@video@Why Power BI loves a Star Schema](https://www.youtube.com/watch?v=vZndrBBPiQc)
- [@video@How to model data in Power BI (Star vs Snowflake schema)](https://www.youtube.com/watch?v=e984cS23nrk)