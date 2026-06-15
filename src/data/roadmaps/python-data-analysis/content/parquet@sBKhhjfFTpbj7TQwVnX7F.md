# Parquet
 
Parquet is a columnar file format optimized for analytical workloads. It stores data with type information, supports efficient compression, and reads much faster than CSV for large datasets. `pd.read_parquet()` requires the `pyarrow` or `fastparquet` library and is the preferred format for storing processed DataFrames on disk.