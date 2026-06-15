# Forward / Backward Fill
 
Forward fill (`ffill`) propagates the last valid value forward to fill subsequent missing entries. Backward fill (`bfill`) does the reverse, filling from the next valid value. Both are commonly used for time series data where missing values represent periods where the previous or next observation is the best estimate.