# Adadelta Optimizer

Adadelta optimization is a stochastic gradient descent method that is based on adaptive learning rate per dimension to address two drawbacks:The continual decay of learning rates throughout training & The need for a manually selected global learning rate.
Adadelta is a more robust extension of Adagrad that adapts learning rates based on a moving window of gradient updates, instead of accumulating all past gradients. This way, Adadelta continues learning even when many updates have been done. Compared to Adagrad, in the original version of Adadelta you don't have to set an initial learning rate. In this version, the initial learning rate can be set, as in most other Keras optimizers.

- [Gradient Descent With Adadelta from Scratch](https://machinelearningmastery.com/gradient-descent-with-adadelta-from-scratch/)
- [ADADELTA : An adaptive learning rate method](https://www.researchgate.net/publication/233981807_ADADELTA_An_adaptive_learning_rate_method)
- [Optimizer that implements the Adadelta algorithm](https://www.tensorflow.org/api_docs/python/tf/keras/optimizers/experimental/Adadelta)
- [AdaDelta Deep Learning Optimizer](https://www.analyticsvidhya.com/blog/2021/10/a-comprehensive-guide-on-deep-learning-optimizers/#AdaDelta_Deep_Learning_Optimizer)
- [Adadelta Optimizer: In-Depth Explanation](https://insideaiml.com/blog/Adagrad-and-Adadelta-optimizer:-In-depth-explanation-1052)