# Forward / Backward Fill

Forward and backward fill are common in time series data, carrying the last known value forward or the next known value backward to fill gaps. This assumes a value likely stayed the same or is reasonably close to nearby recorded values. It's a simpler alternative to statistical imputation, often used when data is missing due to something like a sensor briefly going offline.

Visit the following resources to learn more:

- [@article@Fill in missing values with previous or next value](https://tidyr.tidyverse.org/reference/fill.html)
- [@article@Last observation carried forward](https://r4ds.hadley.nz/missing-values.html#last-observation-carried-forward)