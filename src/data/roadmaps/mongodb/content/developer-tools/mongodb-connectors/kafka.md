# Kafka

Apache Kafka is a popular open-source distributed streaming platform for building real-time data pipelines and high-throughput applications in a fault-tolerant and scalable manner. This section of our guide will provide you with a summary of the Kafka Connectors related to MongoDB, which helps you to effectively stream data between Kafka and MongoDB.

## Overview

Kafka Connect is a powerful framework, part of Apache Kafka, for integrating with external systems like databases, key-value stores, or search indexes through connectors. MongoDB Kafka Connectors allow you to transfer data between the MongoDB Atlas or self-managed MongoDB clusters and Kafka clusters seamlessly.

## MongoDB Source Connector

The MongoDB Source Connector streams the data changes (inserts, updates, deletes, and replacements) within the MongoDB cluster into Kafka in real-time. This is particularly useful when you want to process, analyze, or distribute the updates happening within your MongoDB cluster to different Kafka consumers.

## MongoDB Sink Connector

The MongoDB Sink Connector enables the transfer of data from a Kafka topic to MongoDB by consuming Kafka records and inserting them into the specified MongoDB collection. This can be used to store the result of stream processing or any other transformations applied to the data coming from Kafka into MongoDB, serving as the final data persistence layer.

## Key Features

- **Change Data Capture (CDC)**: Kafka Connectors for MongoDB enable change data capture by capturing and streaming database events and changes in real-time.
- **Schema Evolution**: Connectors automatically handle schema changes and support using Kafka schema registry to manage schema evolution.
- **Ease of setup**: High-level abstraction of the connector framework simplifies setup and configuration.
- **Scalability**: Built on top of the Kafka framework, you can scale up to handle massive data streams.

## Getting Started

To get started with MongoDB Kafka connectors, you can follow these steps:

- Download and install [Apache Kafka](https://kafka.apache.org/downloads) and [MongoDB Kafka Connector](https://www.confluent.io/hub/mongodb/kafka-connect-mongodb).
- Configure your source/sink connector properties.
- Start the Kafka connect runtime with the MongoDB connector.
- Verify that your data is being transferred between Kafka and MongoDB as per your requirement.

For a complete tutorial and detailed configuration options, refer to the [official documentation](https://docs.mongodb.com/kafka-connector/current/kafka-source/).

In conclusion, MongoDB Kafka Connectors allow you to integrate MongoDB and Kafka seamlessly, enabling real-time data streaming and processing. By using these connectors, you can effectively build scalable, fault-tolerant, and resilient data pipelines between the two technologies.
