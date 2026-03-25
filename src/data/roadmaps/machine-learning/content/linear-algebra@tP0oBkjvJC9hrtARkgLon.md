# Linear Algebra

Linear algebra is the branch of mathematics concerning linear equations, linear maps, and their representations in vector spaces and through matrices. It's fundamental to machine learning and deep learning.

## Why Linear Algebra in ML?

- **Data Representation**: Vectors and matrices represent data and parameters
- **Dimensionality Reduction**: Techniques like PCA use linear algebra
- **Neural Networks**: Layers are essentially linear transformations
- **Optimization**: Gradient-based methods rely on linear algebra operations

## Core Concepts

### Vectors
A vector is an ordered list of numbers representing magnitude and direction.

```python
# Example: Feature vector
import numpy as np
features = np.array([1.5, 2.3, 0.8, 4.1])  # 4-dimensional vector
```

### Matrices
A matrix is a rectangular array of numbers with rows and columns.

```python
# Example: Weight matrix in neural network
weights = np.array([
    [0.2, 0.8, -0.5, 0.1],
    [0.5, -0.3, 0.7, 0.2],
    [-0.1, 0.4, 0.6, -0.3]
])
```

### Key Operations

#### Matrix Multiplication
Combines linear transformations:
```
C = A × B
```

#### Dot Product
Measures similarity between vectors:
```
a · b = Σ(ai × bi)
```

#### Transpose
Flips matrix over its diagonal:
```
AT[i,j] = A[j,i]
```

#### Inverse
Matrix that when multiplied gives identity:
```
A × A-1 = I
```

## Important Concepts for ML

### Eigenvalues and Eigenvectors
Special vectors that only scale when transformed:
```
A × v = λ × v
```
- Used in PCA for dimensionality reduction
- Principal components are eigenvectors

### Singular Value Decomposition (SVD)
Factorizes any matrix into three matrices:
```
A = U × Σ × VT
```
- Applications: Recommendation systems, data compression

### Determinant
Scalar value that indicates matrix properties:
- Zero determinant → matrix is not invertible
- Related to volume scaling in transformations

### Norms
Measure vector magnitude:
- L1 norm: Σ|xi| (Manhattan distance)
- L2 norm: √(Σxi²) (Euclidean distance)
- Used in regularization (L1, L2)

## Applications in Machine Learning

### Neural Networks
- Forward pass: Matrix multiplications
- Backpropagation: Gradient calculations
- Weight updates: Linear algebra operations

### Principal Component Analysis (PCA)
- Find eigenvectors of covariance matrix
- Project data onto principal components
- Reduce dimensionality while preserving variance

### Support Vector Machines (SVM)
- Find optimal hyperplane using vector operations
- Kernel trick uses inner products in feature space

### Linear Regression
- Normal equation: (XTX)-1XTy
- Gradient descent uses vector operations

## Best Practices

1. **Use NumPy**: Efficient implementation of linear algebra operations
2. **Check Dimensions**: Ensure matrices are compatible for operations
3. **Numerical Stability**: Be aware of floating-point precision issues
4. **Vectorization**: Avoid loops, use matrix operations
5. **Memory Management**: Large matrices can be memory-intensive

## Common Pitfalls

- **Broadcasting Errors**: Mismatched dimensions
- **Singular Matrices**: Non-invertible matrices
- **Numerical Overflow**: Very large numbers
- **Curse of Dimensionality**: High-dimensional spaces

## Learning Resources

- **3Blue1Brown**: Essence of Linear Algebra video series
- **Khan Academy**: Linear Algebra course
- **Gilbert Strang**: Linear Algebra and Its Applications (book)
- **Practice**: Implement algorithms from scratch