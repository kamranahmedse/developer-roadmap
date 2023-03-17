# Confusion Matrix
It’s important to review the confusion matrix before moving towards precision and recall on machine learning.

The majority class is generally referred to as the negative outcome, and the minority class is frequently alluded to as the positive outcome.

The confusion matrix reveals not only a predictive model’s results, and thus which classes are accurately predicted, which are incorrectly predicted, and what types of problems are being formed.
# Precision
How much does the model get it right when it forecasts a good outcome?
Precision formula in machine learning = True Positives / (True Positives + False Positives)
# Why is Precision Important?
While a perfect machine learning classifier model may achieve 100 percent precision and 100 percent recall, real-world models never do. Models inherently trade off between precision and recall. Typically, the higher the precision, the lower the recall, and vice versa.
# Binary Classification and Precision
An effect is a number ranging from 0.0 (no precision) to 1.0 (perfect precision).

A model assumes 150 instances as belonging to the minority class, 110 of which are correct and 40 of which are incorrect.

This model’s accuracy is estimated as follows:

Precision = 110 / (110+40)
Precision = 110 / 150
Precision = 0.73
Precision is directly proportional to accurate positive predictions to all positive predictions made, or the accuracy of minority class predictions.

This emphasizes that, while precision is beneficial, it does not tell the entire tale. It makes no mention of how many actual positive class examples were incorrectly classified as negative, resulting in so-called false negatives.

# Multi-class Classification and Precision
Precision is determined in an imbalanced classification problem of more than two classes as follows:

Precision formula in Multi-class Classification = True Positives in all classes / (True Positives + False Positives in all classes)
For context, you might have an imbalance classification problem in which the majority class is negative, but two positive minority classes exist: class 1 and class 2. Precision is a metric that measures the proportion of accurate predictions in both positive groups.

For the first minority class, a model predicts 100 cases, 90 of which are correct and 10 of which are incorrect. For the second class, it predicts 175, with  correct 150 answers and 25 incorrect. This model’s precision in ML can be determined as follows:

Precision = (90 + 150) / ((90 + 150) + (10 + 25))
Precision = 240 / (240 + 35)
Precision = 240 / 275
Precision = 0.87
# Accuracy
Accuracy will tell us right away whether a model is being trained correctly and how it will work in general. It does not, however, provide specific details on how it applies to the issue.

The drawback in using ML accuracy as your primary success measure is that it fails miserably when there is a significant class divide.

For unbalanced data sets, accuracy may be deceiving. Consider a study of 95 negative values and 5 positives. In this case, putting all values in the negative category yields a 0.95 score. There are several metrics that are not affected by this problem. Classifying all of the samples as negative in the earlier example yields a 0.5 score, which is equal to a random guess.
# Conclusion
The number of positive class predictions that currently belong to the positive class is calculated by precision.

Precision is used in conjunction with recall, and the two measurements are often combined in the F1 Score to get a single device calculation.

It’s worth noting that the concept of “precision” in the field of information retrieval varies from that of “accuracy” and “precision” in other branches of science and technology.

_Learning Resources_
1.[Javatpoint](https://www.javatpoint.com/precision-and-recall-in-machine-learning)

_Accuracy, Recall and Precision Calculation_
1.[Youtube](https://www.youtube.com/watch?v=RYFViaaJxE8)
