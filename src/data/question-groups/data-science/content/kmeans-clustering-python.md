**Basic usage:**

```python
from sklearn.cluster import KMeans  
kmeans = KMeans(n_clusters=3).fit(X)
labels = kmeans.labels_
```

**Best practices for K-Means:**

```python
# Scale features
from sklearn.preprocessing import StandardScaler
X_scaled = StandardScaler().fit_transform(X)

# Use elbow method to find optimal k
distortions = []
K_range = range(1, 10)
for k in K_range:
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(X_scaled)
    distortions.append(kmeans.inertia_)

# Plot elbow curve
import matplotlib.pyplot as plt
plt.plot(K_range, distortions)
plt.xlabel('k')
plt.ylabel('Distortion')
plt.title('Elbow Method For Optimal k')
``` 