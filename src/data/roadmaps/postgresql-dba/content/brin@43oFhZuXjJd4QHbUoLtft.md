# BRIN (Block Range INdex)

BRIN is an abbreviation for Block Range INdex which is an indexing technique introduced in PostgreSQL 9.5. This indexing strategy is best suited for large tables containing sorted data. It works by storing metadata regarding ranges of pages in the table. This enables quick filtering of data when searching for rows that match specific criteria. While not suitable for all tables and queries, they can significantly improve performance when used appropriately. Consider using a BRIN index when working with large tables with sorted or naturally ordered data.

Learn more from the following resources:

- [@official@BRIN Indexes](https://www.postgresql.org/docs/17/brin.html)
- [@article@Block Range INdexes](https://en.wikipedia.org/wiki/Block_Range_Index)