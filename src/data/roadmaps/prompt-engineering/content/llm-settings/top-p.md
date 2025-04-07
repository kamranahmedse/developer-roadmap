# Top P Sampling

Top P, also known as "nucleus sampling," is a method that provides a more dynamic way to control the randomness of a model's generated output. It improves the trade-off between quality and diversity in text generation.

## How Top P Works?

Instead of picking the top K tokens with the highest probability like in Top K sampling, Top P sampling picks a number of tokens whose cumulative probability adds up to the given value of P. P is a probability mass with a range between 0 and 1. This means that the number of tokens picked will vary, automatically adapting to the distribution in a more granular way.

## Advantages of Top P

1. **More diverse and coherent outputs**: Top P sampling strikes a balance between overly conservative and highly random text. This creates more diverse and coherent outputs compared to Top K sampling.
2. **Adaptive threshold**: The dynamic nature of Top P sampling allows it to adapt to the token probability distribution, unlike Top K sampling which requires manual tuning of K.
3. **Prevents OOV tokens**: By gathering the tokens based on a cumulative probability threshold, Top P sampling effectively prevents selecting out-of-vocabulary (OOV) tokens.

## Adjusting Top P Value

- **Lower values**: Decreasing the value of P will result in more focused outputs, potentially at the expense of diversity.
- **Higher values**: Increasing the value of P will encourage the model to explore more diverse responses, possibly at the cost of coherence.

In practice, a commonly used Top P value is 0.9, but you should experiment with different values for P depending on your specific use-case and desired balance between diversity and coherence.