# Data Collection Considerations

Before designing the technology archecture to collect and store data, you should consider the following factors:

- **Bounded versus unbounded**. Bounded data has defined start and end points, forming a finite, complete dataset, like the daily sales report. Unbounded data has no predefined limits in time or scope, flowing continuously and potentially indefinitely, such as user interaction events or real-time sensor data. The distinction is critical in data processing, where bounded data is suitable for batch processing, and unbounded data is processed in stream processing or real-time systems.
- **Frequency.**  Collection processes can be batch, micro-batch, or real-time, depending on the frequency you need to store the data.
- **Synchronous versus asynchronous.**  Synchronous ingestion is a process where the system waits for a response from the data source before proceeding. In contrast, asynchronous ingestion is a process where data is ingested without waiting for a response from the data source. Each approach has its benefits and drawbacks, and the choice depends on the specific requirements of the data ingestion process and the business needs.
- **Throughput and scalability.** As data demands grow, you will need scalable ingestion solutions to keep pace. Scalable data ingestion pipelines ensure that systems can handle increasing data volumes without compromising performance. Without scalable ingestion, data pipelines face challenges like bottlenecks and data loss. Bottlenecks occur when components can't process data fast enough, leading to delays and reduced throughput. Data loss happens when systems are overwhelmed, causing valuable information to be discarded or corrupted.
- **Reliability and durability.**  Data reliability in the ingestion phase means ensuring that the acquired data from various sources is accurate, consistent, and trustworthy as it enters the data pipeline. Durability entails making sure that data isn’t lost or corrupted during the data collection process.

Visit the following resources to learn more:

- [@book@Fundamentals of Data Engineering](https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/)

