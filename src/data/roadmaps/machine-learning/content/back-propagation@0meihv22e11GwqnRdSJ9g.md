# Back Propagation

Back propagation is the fundamental algorithm used to train neural networks. It's a method for calculating the gradient of the loss function with respect to the weights in the network.

## How It Works

1. **Forward Pass**: Input data flows through the network, producing predictions
2. **Loss Calculation**: Compare predictions with actual values to compute error
3. **Backward Pass**: Propagate the error backward through the network
4. **Weight Update**: Adjust weights using gradient descent to minimize error

## Key Concepts

- **Gradient**: The derivative of the loss function with respect to weights
- **Chain Rule**: Used to compute gradients through multiple layers
- **Learning Rate**: Controls how much weights are adjusted during training
- **Epoch**: One complete pass through the entire training dataset

## Mathematical Foundation

The back propagation algorithm uses the chain rule of calculus to compute gradients:

```
∂L/∂w = ∂L/∂a × ∂a/∂z × ∂z/∂w
```

Where:
- L is the loss function
- w is the weight
- a is the activation
- z is the weighted sum

## Implementation Steps

1. Initialize weights randomly
2. For each training example:
   - Perform forward propagation
   - Calculate the loss
   - Perform backward propagation
   - Update weights
3. Repeat for multiple epochs

## Common Variants

- **Stochastic Gradient Descent (SGD)**: Update weights after each example
- **Mini-batch Gradient Descent**: Update weights after small batches
- **Adam Optimizer**: Adaptive learning rate optimization
- **RMSprop**: Root mean square propagation

## Best Practices

- Use appropriate activation functions (ReLU, sigmoid, tanh)
- Normalize input data
- Use regularization techniques (L1, L2, dropout)
- Monitor training and validation loss
- Adjust learning rate as needed

## Common Issues

- **Vanishing Gradients**: Gradients become too small in deep networks
- **Exploding Gradients**: Gradients become too large
- **Local Minima**: Getting stuck in suboptimal solutions
- **Overfitting**: Model memorizes training data