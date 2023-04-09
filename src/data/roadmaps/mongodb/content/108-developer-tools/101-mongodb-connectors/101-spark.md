# Spark

The [Spark Connector](https://docs.mongodb.com/spark-connector/current/) is a powerful integration tool that allows you to use MongoDB as a data source for your Spark applications. This connector provides seamless integration of the robustness and scalability of MongoDB with the computational power of the Apache Spark framework, allowing you to process large volumes of data quickly and efficiently.

## Key Features

- **MongoDB as Data Source**: The connector enables loading data from MongoDB into Spark data structures like DataFrames and Datasets.
- **Filter Pushdown**: It optimizes performance by pushing down supported filters to execute directly on MongoDB, returning only the relevant data to Spark.
- **Aggregation Pipeline**: The connector allows you to execute MongoDB's aggregation pipeline within Spark, for efficient and powerful transformations.

## Installation

To start using the Spark Connector for MongoDB, you simply need to add the Maven dependency to your `build.sbt` or `pom.xml` file:

For SBT:

```scala
libraryDependencies += "org.mongodb.spark" %% "mongo-spark-connector" % "3.0.1"
```

For Maven:

```xml
<dependency>
  <groupId>org.mongodb.spark</groupId>
  <artifactId>mongo-spark-connector_2.12</artifactId>
  <version>3.0.1</version>
</dependency>
```

## Usage

Here's a basic example of how to work with the MongoDB Spark Connector:

```scala
import org.apache.spark.sql.SparkSession
import com.mongodb.spark.MongoSpark

object MongoDBwithSpark {
  def main(args: Array[String]): Unit = {
    val spark = SparkSession.builder()
      .master("local")
      .appName("MongoDB Integration")
      .config("spark.mongodb.input.uri", "mongodb://username:password@host/database.collection")
      .config("spark.mongodb.output.uri", "mongodb://username:password@host/database.collection")
      .getOrCreate()

    // Load data from MongoDB into a DataFrame
    val df = MongoSpark.load(spark)

    // Perform operations on DataFrame
    // ...

    // Write the DataFrame back to MongoDB
    MongoSpark.save(df.write.mode("overwrite"))

    // Stop the Spark session
    spark.stop()
  }
}
```

With the MongoDB Spark Connector, you can leverage the power of Apache Spark to analyze and process your data, making it easier to develop analytics solutions and handle complex data processing tasks.

For more details, check the [official documentation](https://docs.mongodb.com/spark-connector/current/).
