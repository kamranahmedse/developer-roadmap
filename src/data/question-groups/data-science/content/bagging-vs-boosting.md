Ensemble techniques in machine learning combine multiple weak models into a strong, more accurate predictive model, using the collective intelligence of diverse models to improve performance. Bagging and boosting are different ensemble techniques that use multiple models to reduce error and optimize the model.

![Bagging vs. boosting](https://assets.roadmap.sh/guest/difference-between-bagging-and-boosting-4j47l.png)

The bagging technique uses multiple models trained on different subsets of data. It decreases the variance and helps to avoid overfitting. It is usually applied to decision tree methods and is a special case of the model averaging approach. Boosting is an ensemble modeling technique designed to create a strong classifier by combining multiple weak classifiers. The process involves building models sequentially, where each new model aims to correct the errors made by the previous ones.

- **Bagging:** Builds multiple models in parallel using bootstrapped datasets to reduce variance (e.g., Random Forest).
- **Boosting:** Builds models sequentially, each trying to correct errors from the previous, reducing bias (e.g., XGBoost). 