## ELECTRA (Efficiently Learning an Encoder that Classifies Token Replacements Accurately) resource

- ELECTRA (Efficiently Learning an Encoder that Classifies Token Replacements Accurately) is a new pre-training approach that attempts to match or exceed downstream performance of a pretrained MLM while using significantly less compute resources at the pretraining stage. The ELECTRA framework consists of a generator and a discriminator similar to a generative adversarial network (GAN) and works on the pretraining task known as "replaced token detection". The generator is a small masked language model such as BERT that tries to predict the true identity of randomly masked input tokens. The output of the generator is then fed into the discriminator which predicts whether each input token was original or replaced by the generator.

![](https://media.licdn.com/dms/image/C5612AQFo3MA3cfowLA/article-inline_image-shrink_1500_2232/0/1619978015713?e=1684368000&v=beta&t=gaOPPZ-GiIcEgrlFDs4zbKZiAR7arg_WGkoI-2bd_hQ)

## For more details visit:
[ELECTRA: Pre-training Text Encoders as Discriminators Rather Than Generators (paper explained)](https://www.youtube.com/watch?v=perF6Utzuko)

[ELECTRO](https://www.youtube.com/watch?v=XS9XhZaK288)

[Openreview](https://openreview.net/pdf?id=r1xMH1BtvB)
