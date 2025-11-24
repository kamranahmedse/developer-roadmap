KNN stands for K-nearest neighbors is a classification (or regression) algorithm that, to determine the classification of a point, combines the classification of the K nearest points. It is **supervised** because you are trying to classify a point based on the known classification of other points.

**K-means** is a clustering algorithm that tries to partition a set of points into K sets (clusters) such that the points in each cluster tend to be near each other. It is **unsupervised** because the points have no external classification.

![KNN vs. K-means](https://assets.roadmap.sh/guest/knn-vs-k-means-iqkbo.png)

This table shows the difference between KNN and K-means depending on the use case, data usage, purpose, and other features.

| **Feature**          | **K-Nearest Neighbors (KNN)**                                              | **K-Means Clustering**                                              |
| -------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Algorithm Type**   | Supervised Learning (Classification/Regression)                            | Unsupervised Learning (Clustering)                                  |
| **Purpose**          | Classifies new data points on labeled training data                        | Groups unlabeled data points into clusters                          |
| **Data Usage**       | Uses the entire dataset for predictions                                    | Splits the data into clusters iteratively                           |
| **Scalability**      | Slow for large datasets because all data points are needed for predictions | Faster for large datasets because initial centroids are already set |
| **Example Use Case** | Image Classification, Recommendation Systems                               | Customer Grouping                                                   | 