# Row vs Filter Context

Row context is the context that exists when a formula evaluates one row at a time, such as inside a calculated column or an iterator function, while filter context is the set of filters currently applied from visuals, slicers, and other measures. A single formula can be affected by both at once, and confusing the two is a frequent source of unexpected results. Functions like CALCULATE are what let one type of context interact with, or convert into, the other.

Visit the following resources to learn more:

- [@article@Row Context and Filter Context in DAX](https://www.sqlbi.com/articles/row-context-and-filter-context-in-dax/)
- [@article@Mastering the DAX: Row Context vs Filter Context](https://medium.com/@ashisharora2204/mastering-the-dax-row-context-vs-filter-context-part-2-670ccdf14b09)
- [@video@Row Context vs Filter Context in Power BI | BI Tricks](https://www.youtube.com/watch?v=eWJ9S7jUDjQ)