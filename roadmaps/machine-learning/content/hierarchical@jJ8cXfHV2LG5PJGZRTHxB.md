# Hierarchical Clustering

Hierarchical clustering is a method of grouping data points into clusters based on their similarity, building a hierarchy of clusters. It starts by treating each data point as its own cluster and then iteratively merges the closest clusters until only one cluster remains, or a stopping criterion is met. This process creates a tree-like structure called a dendrogram, which visually represents the hierarchy of clusters. Scikit-learn provides an implementation of agglomerative hierarchical clustering through its `AgglomerativeClustering` class, which allows you to specify the linkage criterion (e.g., ward, complete, average) to determine how the distance between clusters is calculated.

Visit the following resources to learn more:

- [@article@Hierarchical clustering | scikit-learn](https://scikit-learn.org/stable/modules/clustering.html#hierarchical-clustering)
- [@article@What is Hierarchical Clustering?](https://www.ibm.com/think/topics/hierarchical-clustering)