# XL NET
- XLNet is an autoregressive Transformer that leverages the best of both autoregressive language modeling and autoencoding while attempting to avoid their limitations. Instead of using a fixed forward or backward factorization order as in conventional autoregressive models, XLNet maximizes the expected log likelihood of a sequence w.r.t. all possible permutations of the factorization order. 
## XLNET — Generalized Auto-Regressive model for NLU
- XLNET is a generalized autoregressive model where next token is dependent on all previous tokens. XLNET is “generalized” because it captures bi-directional context by means of a mechanism called “permutation language modeling”.

# How is XLNET implemented using Transformers?
- We saw that transformer looks at the hidden representation of the entire sentence to make predictions. To implement XLNET, the transformer is tweaked to look only at the hidden representation of tokens preceding the token to be predicted.
# Experiments conducted with XLNET

- RACE dataset — 100K questions from English exams, XLNET outperforms the best model by 7.6 points in accuracy.
- SQuAD — reading comprehension tasks — XLNET outperforms BERT by 7 points.
- Text Classification — Significantly outperforms BERT on variety of datasets (see paper for more details).
- GLUE Dataset — consists of 9 NLU tasks — Figures reported on paper, XLNET outperforms BERT.
-ClueWeb09-B Dataset — used to evaluate the performance of document ranking, XLNET outperforms BERT.

# Conclusion
- I hope you enjoyed reading this blog. If you have any questions, please do post them below.

- https://towardsdatascience.com/xlnet-explained-in-simple-terms-255b9fb2c97c
- https://www.bing.com/search?q=xlnet+resource+in+ml&qs=HS&pq=xlnet+resource+&sk=HS2&sc=10-15&cvid=7FF6034CB8404A53A7A904C79B0E4D24&FORM=QBRE&sp=3&lq=0
- https://analyticsindiamag.com/guide-to-xlnet-for-language-understanding/

# youtube links
- [XLNet: Generalized Autoregressive Pretraining for Language Understanding](https://youtu.be/H5vpBCLo74U)
- [XLNet Explained](https://youtu.be/naOuE9gLbZo)
- [XLNet Made Easy ](https://youtu.be/1yPT-aAD_a0)
- [BERT and XLNet for Asset Classification 2021](https://youtu.be/7eJ4QQRI7DA)
