![IOT Data Streams](https://assets.roadmap.sh/guest/iot-data-streams-ks8vn.png)

A real-time data capture and processing architecture would require the following components:

- Use a scalable data ingestion service such as [Kafka](https://kafka.apache.org/) or [AWS Kinesis](https://aws.amazon.com/es/pm/kinesis/) that is compatible with one of the many IoT standard protocols (like MQTT or CoAP).
- Process the data through real-time processing engines such as Apache Flink or Spark Streaming.
- Store the data inside a scalable data lake, ideally a time-series compatible system such as [InfluxDB](https://www.influxdata.com/).
