# Dual Storage Mode

Dual storage mode lets a table be configured to use both Import and DirectQuery, switching between them depending on the type of query Power BI needs to run. It is commonly used for large fact tables where recent data stays in DirectQuery for freshness while historical data is imported for speed. This setup requires careful design of aggregation tables to work well.

Visit the following resources to learn more:

- [@official@Table storage mode in Power BI semantic models](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-storage-mode)
- [@article@What is Dual Storage Mode in Power BI?](https://www.graphed.com/blog/what-is-dual-storage-mode-in-power-bi)
- [@video@Boost DAX Performance in Power BI with Dual Mode](https://www.youtube.com/watch?v=TgAXt1ifdhs)