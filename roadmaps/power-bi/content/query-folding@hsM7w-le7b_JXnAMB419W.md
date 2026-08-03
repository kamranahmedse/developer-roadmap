# Query Folding

Query folding is when Power Query translates its transformation steps back into a query that runs on the source system, such as SQL, instead of pulling all the raw data and transforming it locally. This pushes the processing work to the source, which is usually faster and lighter on memory. Not all steps fold, and checking the native query lets you see how far folding goes before it breaks.

Visit the following resources to learn more:

- [@official@Query folding guidance in Power BI Desktop](https://learn.microsoft.com/en-us/power-bi/guidance/power-query-folding)
- [@official@Overview of query evaluation and query folding in Power Query](https://learn.microsoft.com/en-us/power-query/query-folding-basics)
- [@video@Enable Query Folding for Native Queries in Power BI Desktop](https://www.youtube.com/watch?v=8hjdOCni_ZY)