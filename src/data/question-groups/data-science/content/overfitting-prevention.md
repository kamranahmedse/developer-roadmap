Overfitting in machine learning happens when the model learns from the training data too well, including non-relevant details. This leads the model to perform very well on the training data but poorly on other data.

**Prevention techniques:**

- **Regularization (L1/L2):** This method adds a penalty to large weights to keep the model from becoming too complex.
- **Cross-validation:** This helps test the model on different slices of data to make sure it generalizes well.
- **Pruning (for tree models):** Cuts back unnecessary branches that overcomplicate the model.
- **Early stopping:** Stops training when performance stops improving on the validation set.
- **Dropout (for neural nets):** This method randomly drops neurons during training so the network doesn't become too dependent on specific paths. 