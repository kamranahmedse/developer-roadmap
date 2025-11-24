```python
accuracy = (TP + TN) / (TP + TN + FP + FN)
precision = TP / (TP + FP)  # How many selected items are relevant
recall = TP / (TP + FN)     # How many relevant items are selected
f1_score = 2 * (precision * recall) / (precision + recall)  # Harmonic mean

# For imbalanced datasets, consider:
specificity = TN / (TN + FP)
balanced_accuracy = (recall + specificity) / 2
``` 