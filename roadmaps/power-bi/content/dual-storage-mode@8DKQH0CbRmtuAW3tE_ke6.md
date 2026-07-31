# Dual Storage Mode
 
Dual storage mode lets a table be configured to use both Import and DirectQuery, switching between them depending on the type of query Power BI needs to run. It is commonly used for large fact tables where recent data stays in DirectQuery for freshness while historical data is imported for speed. This setup requires careful design of aggregation tables to work well.