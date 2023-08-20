# Unsupervised Data Augmentation
Unsupervised Data Augmentation (UDA) makes use of both labelled data and unlabeled data and computes the loss function using standard methods for supervised learning to train the model.
# Unsupervised Data Augmentation for Consistency Training
Semi-supervised learning lately has shown much promise in improving deep learning
models when labeled data is scarce. 
# Augmentation Strategies for Different Tasks

## Confidence-Based Masking
Specifically, in each minibatch, the consistency loss term is computed only on examples whose highest probability among classification categories is greater than a threshold β. β=0.8 for CIFAR-10 and SVHN and β=0.5 for ImageNet.

## Sharpening Predictions
Since regularizing the predictions to have low entropy has been shown to be beneficial, predictions are sharpen when computing the target distribution on unlabeled examples by using a low Softmax temperature τ.

# Learning Materials
[unsupervised machine learning](https://www.linedata.com/what-unsupervised-machine-learning#:~:text=We%20can%20think%20of%20unsupervised,on%20their%20similarity%20and%20differences.)

[unsupervised data augmentation for consistency training](https://scholar.google.co.in/scholar?q=unsupervised+data+augmentation+for+consistency+training&hl=en&as_sdt=0&as_vis=1&oi=scholart)

[Unsupervised Data Augmentation and its types](https://sh-tsang.medium.com/review-uda-unsupervised-data-augmentation-for-consistency-training-3c97274b20c5)

# Youtube Videos

[Unsupervised Data Augmentation
](https://www.youtube.com/watch?v=-u8Mi57BDIY)

[Data Augmentation using Pre-trained Transformer Models](https://www.youtube.com/watch?v=3N_a7LAU-pc)
