## T-SNE
## What is T-SNE?
T-distributed Stochastic Neighbor Embedding (t-SNE) is a nonlinear dimensionality reduction technique well-suited for embedding high-dimensional data for visualization in a low-dimensional space of two or three dimensions.

## What is dimensionality reduction?
Dimensionality Reduction is the technique of representing n-dimensions data(multidimensional data with many features) in 2 or 3 dimensions.
An example of dimensionality reduction can be discussed as a classification problem i.e. student will play football or not that relies on both temperature and humidity can be collapsed into just one underlying feature, since both of the features are correlated to a high degree. Hence, we can reduce the number of features in such problems. A 3-D classification problem can be hard to visualize, whereas a 2-D one can be mapped to simple 2-dimensional space and a 1-D problem to a simple line.

## How does T-SNE works? 
T-SNE a non-linear dimensionality reduction algorithm finds patterns in the data based on the similarity of data points with features, the similarity of points is calculated as the conditional probability that a point A would choose point B as its neighbour. It then tries to minimize the difference between these conditional probabilities (or similarities) in higher-dimensional and lower-dimensional space for a perfect representation of data points in lower-dimensional space.

## Reference liks:
- [t-distributed stochastic neighbor embedding](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding)
- [An Introduction to t-SNE with Python Example](https://towardsdatascience.com/an-introduction-to-t-sne-with-python-example-5a3a293108d1)
- [Comprehensive Guide on t-SNE algorithm with implementation in R & Python](https://www.analyticsvidhya.com/blog/2017/01/t-sne-implementation-r-python/)
- [ML | T-distributed Stochastic Neighbor Embedding (t-SNE) Algorithm](https://www.geeksforgeeks.org/ml-t-distributed-stochastic-neighbor-embedding-t-sne-algorithm/)
- [t-SNE: Clearly Explained - YouTube](https://youtu.be/43ySR7_Yb4E)
