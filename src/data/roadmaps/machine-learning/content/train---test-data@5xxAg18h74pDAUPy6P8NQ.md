# Train-Test Data

When building a machine learning model, we usually split our dataset into two parts: a training set and a testing set. The training set is used to teach the model how to make predictions, while the testing set is used to evaluate how well the model has learned. This helps us understand if the model can generalize to new, unseen data. In scikit-learn, you can easily split your data using the `train_test_split` function from the `model_selection` module. You provide your data and labels to this function, and it returns the split datasets. You can also specify the proportion of data to be used for testing.

Visit the following resources to learn more:

- [@official@train_test_split](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html)
- [@article@Split Your Dataset With scikit-learn's train_test_split()](https://realpython.com/train-test-split-python-data/)
- [@video@Train Test Split with Python Machine Learning (Scikit-Learn)](https://www.youtube.com/watch?v=SjOfbbfI2qY)