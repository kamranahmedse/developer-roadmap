The difference between long format data and wide format data comes down to how your data is structured. A wide format has values that do not repeat in the columns, while a long format has values that do repeat in the columns.

In wide format, you spread data across columns. Each variable (Jan, Feb, March) gets its own column. You'll usually see this in reports or dashboards.

![Wide format data](https://assets.roadmap.sh/guest/wide-format-data-gxwrc.png)

In long format, data is stacked in rows. One column stores the values, and another column tells you what those values represent. This format is cleaner for grouped summaries and time series analysis.

![Long format data](https://assets.roadmap.sh/guest/long-format-data-opeyt.png)

**Use case:** Wide format is useful for reporting and making data visualizations. Long format is preferred for time series, grouped summaries, and plotting tools like Seaborn or ggplot.

**Common pitfall:** Trying to perform group-level analysis on wide-format data without reshaping it first. 