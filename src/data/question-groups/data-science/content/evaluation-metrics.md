Once a machine learning model has been created, it is important to evaluate and test how well it performs on data. An evaluation metric is a mathematical quantifier of the quality of the model. Precision, Recall, F1 Score, and AUC-ROC are all evaluation metrics.

- **Precision** is all about how accurate your positive predictions are. Of all the items your model labeled as positive, how many were actually positive?
  **Formula = TP / (TP + FP).** It tells you how much you can trust the positives your model finds.
- **Recall** focuses on finding all the actual positives. It measures how well your model catches everything it should've caught.
  **Formula = TP / (TP + FN).** It's especially useful when missing a positive is costly like missing a cancer diagnosis.
- **F1 Score:** F1 Score combines Recall and Precision into one performance metric. The F1 Score is the weighted average of Precision and Recall. Therefore, this score takes both false positives and false negatives into account. F1 is usually more useful than Accuracy, especially if you have an uneven class distribution.
- **AUC-ROC:** The AUC-ROC curve is a tool for evaluating the performance of binary classification models. It plots the True Positive Rate (TPR) against the False Positive Rate (FPR) at different thresholds, showing how well a model can distinguish between two classes, such as positive and negative outcomes. It provides a graphical representation of the model's ability to distinguish between two classes, like a positive class for the presence of a disease and a negative class for the absence of a disease.

**Key:** TP = True Positive, FP = False Positive, FN = False Negative. 