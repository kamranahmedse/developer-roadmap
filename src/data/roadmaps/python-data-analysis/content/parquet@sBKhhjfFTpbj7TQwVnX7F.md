# Parquet

Parquet is a columnar file format optimized for analytical workloads. It stores data with type information, supports efficient compression, and reads much faster than CSV for large datasets. `pd.read_parquet()` requires the `pyarrow` or `fastparquet` library and is the preferred format for storing processed DataFrames on disk.

Visit the following resources to learn more:

- [@official@pandas.read_parquet](https://pandas.pydata.org/docs/reference/api/pandas.read_parquet.html)
- [@video@Reading Parquet Files in Python](https://www.youtube.com/watch?v=XFO5jdGsMek)