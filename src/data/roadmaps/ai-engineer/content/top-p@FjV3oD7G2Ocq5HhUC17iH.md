# Top-P Sampling

Top-P sampling, also known as nucleus sampling, is a technique used in language models to generate text. Instead of considering all possible next words, it focuses on the smallest set of words whose cumulative probability exceeds a threshold 'P'. Unlike Top-K's fixed number, Top-P dynamically adjusts based on the probability distribution. Low values (0.1-0.5) produce focused outputs, medium (0.6-0.9) balance creativity and coherence, and high (0.9-0.99) enable creative diversity.

Visit the following resources to learn more:

- [@article@Top-P Sampling: What Is It and Why Does It Matter?](https://www.dataannotation.tech/blog/top-p-sampling)
- [@video@What are the LLM’s Top-P + Top-K ?](https://www.youtube.com/watch?v=aDmp2Uim0zQ)