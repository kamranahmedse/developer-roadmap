# Star vs Snowflake Schema

A star schema is a way to organize data in a database, namely in data warehouses, to make it easier and faster to analyze. At the center, there's a main table called the **fact table**, which holds measurable data like sales or revenue. Around it are **dimension tables**, which add details like product names, customer info, or dates. This layout forms a star-like shape.

A snowflake schema is another way of organizing data. In this schema, dimension tables are split into smaller sub-dimensions to keep data more organized and detailed, just like snowflakes in a large lake. 

The star schema is simple and fast -ideal when you need to extract data for analysis quickly. On the other hand, the snowflake schema is more detailed. It prioritizes storage efficiency and managing complex data relationships. 

Visit the following resources to learn more:

- [@official@Star Schema vs Snowflake Schema: Differences & Use Cases](https://www.datacamp.com/blog/star-schema-vs-snowflake-schema)
