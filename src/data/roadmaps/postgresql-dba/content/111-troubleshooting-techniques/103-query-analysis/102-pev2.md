# PEV2

`pev2`, or *Postgres Explain Visualizer v2*, is an open-source tool designed to make query analysis with PostgreSQL easier and more understandable. By providing a visual representation of the `EXPLAIN ANALYZE` output, `pev2` simplifies query optimization by displaying the query plan and execution metrics in a readable structure. In this section, we cover the key features of `pev2` and explore how it assists in query analysis.

* **Visual Representation**: `pev2` converts the raw text output of an `EXPLAIN ANALYZE` query into an interactive and color-coded tree structure that is easy to understand at a glance.

* **Query Plan Metrics**: The tool provides useful execution metrics, such as the query's total execution time, processing steps, and related node costs.

* **Powerful Interactivity**: Hovering over specific nodes in the visual representation displays additional information, like the time spent on a specific step or the number of rows processed.

* **Indented JSON Support**: `pev2` supports indented JSON parsing, making it easier to read and understand the plan for large and complex queries.

* **Save and Share Plans**: The tool allows you to save your query plans as a URL, facilitating easy sharing with your colleagues.

To use `pev2`, follow these steps:
1. Run your `EXPLAIN ANALYZE` query in your preferred PostgreSQL client.
2. Copy the output text.
3. Visit [https://explain.depesz.com/](https://explain.depesz.com/).
4. Paste the copied output in the text box and click "Explain."
5. Explore the visual representation of the query plan and analyze your query's performance.

Now that you are familiar with `pev2`, use it to better understand and optimize your PostgreSQL queries. Remember, fine-tuning your queries can significantly improve performance and ensure a seamless experience for end-users. Happy optimizing!
