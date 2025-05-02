# Tokenization

Tokenization is the step where raw text is broken into small pieces called tokens, and each token is given a unique number. A token can be a whole word, part of a word, a punctuation mark, or even a space. The list of all possible tokens is the model’s vocabulary. Once text is turned into these numbered tokens, the model can look up an embedding for each number and start its math. By working with tokens instead of full sentences, the model keeps the input size steady and can handle new or rare words by slicing them into familiar sub-pieces. After the model finishes its work, the numbered tokens are turned back into text through the same vocabulary map, letting the user read the result.

Visit the following resources to learn more:

- [@article@Explaining Tokens — the Language and Currency of AI](https://blogs.nvidia.com/blog/ai-tokens-explained/)
- [@article@What is Tokenization? Types, Use Cases, Implementation](https://www.datacamp.com/blog/what-is-tokenization)
