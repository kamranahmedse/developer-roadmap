# Model Evaluation

Model evaluation is the process of assessing how well a machine learning model performs on a given dataset. It involves using various metrics and techniques to quantify the model's accuracy, reliability, and generalization ability. This helps determine if the model is suitable for deployment and whether further improvements are needed.

## Why Model Evaluation Matters

- **Performance Assessment**: Quantify how well the model performs
- **Model Selection**: Choose between different models or configurations
- **Hyperparameter Tuning**: Optimize model parameters
- **Business Impact**: Ensure the model meets business requirements
- **Risk Assessment**: Understand potential failures and limitations

## Key Evaluation Concepts

### Training vs. Test Data
- **Training Set**: Data used to train the model
- **Validation Set**: Data used to tune hyperparameters
- **Test Set**: Unseen data for final evaluation
- **Holdout Method**: Simple train-test split
- **Cross-Validation**: More robust evaluation technique

### Bias-Variance Tradeoff
- **Bias**: Error from erroneous assumptions
- **Variance**: Error from sensitivity to training data
- **Underfitting**: High bias, low variance
- **Overfitting**: Low bias, high variance
- **Sweet Spot**: Balance between bias and variance

## Evaluation Metrics by Task Type

### Classification Metrics

#### Accuracy
```
Accuracy = (TP + TN) / (TP + TN + FP + FN)
```
- Simple to understand
- Can be misleading with imbalanced data

#### Precision
```
Precision = TP / (TP + FP)
```
- Important when false positives are costly
- "Of all predicted positive, how many are actually positive?"

#### Recall (Sensitivity)
```
Recall = TP / (TP + FN)
```
- Important when false negatives are costly
- "Of all actual positives, how many were predicted?"

#### F1 Score
```
F1 = 2 × (Precision × Recall) / (Precision + Recall)
```
- Harmonic mean of precision and recall
- Good for imbalanced datasets

#### ROC Curve and AUC
- **ROC Curve**: Plot of TPR vs FPR
- **AUC**: Area under the ROC curve
- Measures model's ability to distinguish classes

### Regression Metrics

#### Mean Absolute Error (MAE)
```
MAE = (1/n) × Σ|yi - ŷi|
```
- Easy to interpret
- Less sensitive to outliers

#### Mean Squared Error (MSE)
```
MSE = (1/n) × Σ(yi - ŷi)²
```
- Penalizes large errors more
- Differentiable, good for optimization

#### Root Mean Squared Error (RMSE)
```
RMSE = √MSE
```
- Same units as target variable
- Popular regression metric

#### R² (R-squared)
```
R² = 1 - (SSres / SStot)
```
- Proportion of variance explained
- Range: 0 to 1 (can be negative)

## Advanced Evaluation Techniques

### Cross-Validation

#### K-Fold Cross-Validation
1. Split data into K folds
2. Train on K-1 folds, test on 1 fold
3. Repeat K times
4. Average the results

#### Stratified K-Fold
- Preserves class distribution
- Better for classification tasks

#### Leave-One-Out Cross-Validation (LOOCV)
- Extreme case of K-fold where K = n
- Computationally expensive

### Bootstrap Methods
- Sampling with replacement
- Estimate confidence intervals
- Useful for small datasets

## Practical Considerations

### Choosing the Right Metric
- **Business Objective**: Align with business goals
- **Data Characteristics**: Consider class imbalance
- **Cost Sensitivity**: Weigh different error types
- **Interpretability**: Stakeholder understanding

### Common Pitfalls
- **Data Leakage**: Using test data in training
- **Target Leakage**: Including future information
- **Selection Bias**: Non-representative sampling
- **Metric Gaming**: Optimizing for wrong metric

### Evaluation Checklist
- [ ] Define clear evaluation criteria
- [ ] Use appropriate train/test split
- [ ] Select metrics based on problem type
- [ ] Perform cross-validation
- [ ] Check for overfitting
- [ ] Consider business impact
- [ ] Document evaluation process

## Tools and Libraries

### Python Libraries
```python
# Scikit-learn metrics
from sklearn.metrics import accuracy_score, precision_score, recall_score
from sklearn.metrics import f1_score, roc_auc_score, mean_squared_error
from sklearn.model_selection import cross_val_score, KFold

# Example usage
accuracy = accuracy_score(y_true, y_pred)
cv_scores = cross_val_score(model, X, y, cv=5)
```

### Visualization
- **Confusion Matrix**: Visualize classification errors
- **Learning Curves**: Plot performance vs. training size
- **Validation Curves**: Plot performance vs. hyperparameters

## Best Practices

1. **Always use a holdout test set** for final evaluation
2. **Use multiple metrics** to get a complete picture
3. **Consider the business context** when selecting metrics
4. **Document evaluation methodology** for reproducibility
5. **Monitor model performance** in production
6. **Set up automated evaluation** pipelines
7. **Regularly re-evaluate** models as data evolves