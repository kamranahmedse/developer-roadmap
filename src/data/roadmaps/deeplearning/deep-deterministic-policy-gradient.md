# Introduction to Deep Deterministic Policy Gradient (DDPG)
Deep Deterministic Policy Gradient (DDPG) is an algorithm which concurrently learns a Q-function and a policy. It uses off-policy data and the Bellman equation to learn the Q-function, and uses the Q-function to learn the policy.

This approach is closely connected to Q-learning, and is motivated the same way: if you know the optimal action-value function Q^*(s,a), then in any given state, the optimal action a^*(s) can be found by solving

a^*(s) = \arg \max_a Q^*(s,a).

## Resource
- [Deterministic Policy Gradient Algorithms](http://proceedings.mlr.press/v32/silver14.pdf)
- [
Deep Deterministic Policy Gradients Explained | by Chris Yoon](https://towardsdatascience.com/deep-deterministic-policy-gradients-explained-2d94655a9b7b)
- [The Policy Gradient Theorem](https://www.coursera.org/lecture/prediction-control-function-approximation/the-policy-gradient-theorem-Wv6wa)
