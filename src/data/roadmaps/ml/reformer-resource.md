# Reformer Resource
Large Transformer models routinely achieve state-of-the-art results on a number of tasks but training these models can be prohibitively costly, especially on long sequences. We introduce two techniques to improve the efficiency of Transformers. For one, we replace dot-product attention by one that uses locality-sensitive hashing, changing its complexity from O(L^2) to O(Llog(L)).

# Applications of Reformer
The novel application of these two approaches in Reformer makes it highly efficient, enabling it to process text sequences of lengths up to 1 million words on a single accelerator using only 16GB of memory.
# Learning Source

[What is Reformer resource?](https://ai.googleblog.com/2020/01/reformer-efficient-transformer.html)

[Reformer resource in deep learning](https://www.infoq.com/news/2020/02/google-reformer-deep-learning/)

[Hands on guide to Reformer](https://analyticsindiamag.com/hands-on-guide-to-reformer-the-efficient-transformer/)

[youtube link](https://www.youtube.com/watch?v=i4H0kjxrias)