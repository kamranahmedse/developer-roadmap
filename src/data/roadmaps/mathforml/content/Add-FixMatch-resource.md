# Fix match:
FixMatch is an algorithm that first generates pseudo-labels using the model's predictions on weakly-augmented unlabeled images. For a given image, the pseudo-label is only retained if the model produces a high-confidence prediction. The model is then trained to predict the pseudo-label when fed a strongly-augmented version of the same image.

# Resource:
- [original FixMatch paper?](https://arxiv.org/abs/2001.07685)

- [PyTorch implementation of FixMatch?](https://github.com/google-research/fixmatch)

- [implementation using TensorFlow?](https://towardsdatascience.com/fixmatch-simplifying-semi-supervised-learning-with-consistency-and-confidence-5bd5ed1fdbb0)

- [FixMatch paper and implementation?](https://www.youtube.com/watch?v=Z1RJmh_OqeA)

- [PyTorch Lightning implementation of FixMatch?](https://github.com/kekmodel/FixMatch-pytorch-lightning)

- [FixMatch using TensorFlow?](https://www.tensorflow.org/tutorials/images/semi_supervised_learning_with_fixmatch)
