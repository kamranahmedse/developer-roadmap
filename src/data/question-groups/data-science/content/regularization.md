Regularization is a technique in machine learning to prevent models from overfitting. Overfitting happens when a model doesn't just learn from the underlying patterns (signals) in the training data but also picks up and amplifies the noise in it. This leads to a model that performs well on training data but poorly on new data.

L1 and L2 regularization are methods used to mitigate overfitting in machine learning models by adding a penalty term on coefficients to the model's loss function. This penalty discourages the model from assigning too much importance to any single feature (represented by large coefficients), making the model more straightforward. Regularization keeps the model balanced and focused on the true signal, enhancing its ability to generalize to unseen data.

A regression model that uses the L1 regularization technique is called lasso regression, and a model that uses the L2 is called ridge regression.

- **L1 Regularization:** Also called a lasso regression, this adds the absolute value of the sum ("absolute value of magnitude") of coefficients as a penalty term to the loss function.
- **L2 Regularization:** Also called a ridge regression, this adds the squared sum ("squared magnitude") of coefficients as the penalty term to the loss function. 