When building a predictive model, I like to combine practical steps and proven techniques to ensure that the features I include actually help the model rather than add noise, redundancy, or overfitting risk.

**I'll approach like this:**

1. **Start with domain knowledge:** Talk to stakeholders and review documentation to understand what features make the most sense in our business context.
2. **Use filter methods for a first pass:** I run statistical checks like correlation, ANOVA, chi-square tests, or mutual information to remove irrelevant or redundant features. Filter methods are fast, which is especially helpful when you're working with high-dimensional data.
3. **Apply wrapper methods for performance tuning:** For a more refined selection, I use wrapper methods like Recursive Feature Elimination (RFE). These methods evaluate subsets of features based on how well the model performs, which helps surface the most predictive combinations. They take more time but are worth it for high-impact models.
4. **Leverage embedded methods for efficiency:** Models like Lasso (L1), Ridge (L2), and tree-based models (Random Forest, XGBoost) have built-in feature importance. I like these because they optimize feature selection during model training, balancing speed and accuracy.
5. **Hybrid approach:** Sometimes, I start with a filter method to reduce dimensions and then fine-tune with wrapper or embedded methods. This hybrid approach saves time and improves performance.

**How I decide what to drop or keep:**

- If a feature is highly correlated with another, I drop the weaker or noisier one.
- If it has low variance and no predictive power, it goes.
- If it helps interpretability or improves metrics on validation data, I keep it.
- If it harms generalization or adds complexity, I drop it. 