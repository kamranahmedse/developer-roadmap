After observing that my data set has missing values, I'll figure out how it occurs. Are they represented as **NaN,** **None,** empty strings, weird characters like -999, a combination of two or more, or something else?

![How to handle missing data](https://assets.roadmap.sh/guest/how-do-you-handle-missing-data-vrptm.png)

Once I make sense of what my missing data looks like, I dig into why these values are missing, and they usually fall into three categories:

- **Missing Completely At Random (MCAR):** No pattern, just random gaps. These are usually safe to drop, especially if there aren't many.

    **Example:** In a survey dataset, 10% of income entries are missing due to a technical glitch that affected a random subset of responses. There's no pattern based on age, education, employment status, or anything else.

- **Missing At Random (MAR):** This is when the missing data is related to *other observed variables*, but not to the income value itself.

    **Example:** In the same dataset, 10% of `income` values are missing, mostly among respondents who are students. Here, missing data is related to the `occupation` variable, not the actual income value. Impute based on related features like `occupation`, `education level`, or `age`. Impute based on related features like `occupation`, `education level`, or `age`. Safe to drop or impute with mean/median since the missing data doesn't introduce bias.

- **MNAR (Missing Not At Random):** The reason it's missing is tied to the value itself. 

    **Example:** If high spenders choose not to share income, that's tougher to handle and sometimes better tracked with a missingness flag. The probability of missingness increases with the income amount. Imputation is risky here. I'll consider flagging missingness with a binary indicator (`income_missing`) or using models that can account for MNAR, like EM algorithms or data augmentation techniques.

Once I know the type of missingness, I choose one of the following:
a. **Deletion (if safe):** 

- **Listwise:** Drop rows with missing values (only when missingness is random and small). 
- **Pairwise:** Use available values for calculations, such as correlations. 
- **Drop columns:** Remove low-value features with lots of missing data.

b.  **Simple imputation:**

- **Mean/Median/Mode:** Use for numeric or categorical columns, depending on distribution.
- **Arbitrary values:** Fill with 0 or "Unknown" if it makes sense contextually.
- **Forward/Backward fill:** Best for time series to keep temporal consistency.

c.  **Advanced imputation:**

- **KNN imputer:** Fills gaps by finding similar rows using distance metrics.
- **Iterative imputer:** Builds a model with other columns to estimate missing values.
- **Interpolation:** Good for numeric sequences, especially when data follows a trend.

d.  **Use missingness as a feature:**

- If the missing value could carry a signal, I add a binary indicator column (e.g., was_missing = 1).

e.  **Oversampling or undersampling:**

- If missing data causes class imbalance, I use resampling to maintain a fair target distribution.

**Common pitfall**:
Filling in values without understanding the pattern of missingness. For example, using mean imputation on MNAR data can introduce bias and weaken your model's predictive power. 