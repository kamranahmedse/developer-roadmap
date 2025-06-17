You monitor model performance in production by tracking both functional and operational metrics.

**Functional monitoring** checks the health of the data and the model:

- **Data quality**: Monitor for missing values, duplicates, and syntax errors.
- **Data/feature drift**: Compare current input data to training data using stats like KL divergence, PSI, chi-squared, etc.
- **Model drift**: Check if model accuracy drops over time due to changing patterns in the data.

**Operational monitoring** keeps the system running smoothly:

- **System health**: Tracks latency, errors, and memory usage.
- **Input data health**: Watch for type mismatches, nulls, and out-of-range values.
- **Model performance**: Use precision/recall, RMSE, or top-k accuracy depending on the use case.
- **Business KPIs**: Tie model performance to actual business outcomes (e.g., conversions, revenue impact). 