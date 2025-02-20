# PyTorch C++

PyTorch C++ is the C++ API (Application Programming Interface) for PyTorch. It is also known as LibTorch, which is a library that provides almost all the functionality of PyTorch accessible through C++ language. The main goal of providing a C++ API is to enable high-performance integration with other deep learning platforms and enable seamless operation in enterprise and production-level systems.

## Installation

To use the PyTorch C++ API, you need to install the LibTorch distribution. Follow the instructions on the [official PyTorch C++ API page](https://pytorch.org/cppdocs/installing.html) to install the library based on your platform and requirements.

## Example: Tensors

```cpp
#include <iostream>
#include <torch/torch.h>

int main() {
  // Create a 3x3 matrix with zeros.
  torch::Tensor a = torch::zeros({3, 3});
  std::cout << a << '\n';

  // Create a 2x2 matrix with ones and convert to float.
  torch::Tensor b = torch::ones({2, 2}).to(torch::kFloat);
  std::cout << b << '\n';

  // Create a random tensor size 2x2 and specify its type.
  torch::Tensor c = torch::randint(0, 10, {2, 2}, torch::kInt);
  std::cout << c << '\n';

  // Perform element-wise addition.
  auto sum = b + c.to(torch::kFloat);
  std::cout << sum << '\n';
}
```

## Example: Creating a Custom Module

```cpp
#include <iostream>
#include <torch/torch.h>

// Define a custom module.
struct Net : torch::nn::Module {
  Net() {
    fc1 = register_module("fc1", torch::nn::Linear(784, 64));
    fc2 = register_module("fc2", torch::nn::Linear(64, 10));
  }

  torch::Tensor forward(torch::Tensor x) {
    x = x.view({-1, 784});
    x = torch::relu(fc1->forward(x));
    x = torch::log_softmax(fc2->forward(x), 1);
    return x;
  }

  torch::nn::Linear fc1{nullptr};
  torch::nn::Linear fc2{nullptr};
};

int main() {
  // Create an instance of the custom module.
  Net net;

  // Use the custom module.
  torch::Tensor input = torch::randn({2, 1, 28, 28});
  torch::Tensor output = net.forward(input);
  std::cout << output << '\n';

  return 0;
}
```

In these examples, we demonstrated how to use various tensor operations and how to create a custom neural network module with PyTorch C++. For more detailed information and tutorials, visit the [official PyTorch C++ documentation](https://pytorch.org/cppdocs/).