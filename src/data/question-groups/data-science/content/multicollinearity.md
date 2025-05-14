Multicollinearity is when two or more independent variables in a regression model are highly correlated, meaning they tell similar stories. This makes it hard for the model to figure out which variable is actually influencing the target, leading to unreliable or unstable coefficient estimates. 

For example, in a regression model looking at economic growth, common variables will be GDP, Unemployment Rate, and Consumer Spending. These variables are all related, and the model might not be as effective as it should be.

**To detect multicollinearity use:**

- **Correlation matrix:** A correlation matrix detects multicollinearity by visualizing the strength of relationships between variables. A general rule is that any correlation value above 0.6 indicates strong multicollinearity.
- **Variance inflation factor (VIF):** VIF detects multicollinearity by giving a numerical value that indicates how much the variance of a regression coefficient is inflated due to multicollinearity. A VIF value greater than 5 indicates moderate multicollinearity, while values above 10 suggest severe multicollinearity.
- **Condition index:** The condition index is a tool for detecting multicollinearity. Values above 10 indicate moderate multicollinearity, and values above 30 indicate severe multicollinearity. The condition index works by checking how much the independent variables are related to each other by examining the relationships between their eigenvalues.

**Common pitfall:** Including highly correlated predictors without checking VIF may inflate model error and reduce stability. 