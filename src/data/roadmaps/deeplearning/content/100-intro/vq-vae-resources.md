# VQ-VAE
VQ-VAE (Vector Quantized Variational Autoencoder) is a type of neural network architecture used for unsupervised learning tasks such as image and video compression, feature extraction, and generative modeling. It is a combination of two deep learning models: a variational autoencoder (VAE) and a vector quantization (VQ) model.
The VAE component of the VQ-VAE model learns to encode input data into a lower-dimensional latent space, while the VQ model maps the latent representations to a discrete codebook of fixed-size embeddings. The codebook serves as a dictionary of learned prototypes, which the VQ-VAE uses to approximate the input data. By using discrete embeddings instead of continuous values, the VQ-VAE can achieve better compression and regularization of the input data.
## To Know more
- [Implementing VQ-VAE](https://pytorch.org/docs/stable/generated/torch.nn.ConvTranspose2d.html)
- [Video : Implementing VQ-VAE](https://youtu.be/VZFVUrYcig0)
- [Video : Using VQ-VAE for image generation](https://youtu.be/FUtj2iqrC64)
- [Blog : Understanding VQ-VAE](https://ml.berkeley.edu/blog/posts/vq-vae/)
- [Video : Using VQ-VAE for high resolution image synthesis](https://youtu.be/j2PXES-liuc)
