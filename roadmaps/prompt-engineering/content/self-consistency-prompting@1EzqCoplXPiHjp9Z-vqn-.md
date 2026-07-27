# Self-Consistency Prompting

Self-consistency prompting generates multiple reasoning paths for the same problem using higher temperature settings, then selects the most commonly occurring answer through majority voting. This technique combines sampling and voting to improve accuracy and provides pseudo-probability of answer correctness. While more expensive due to multiple API calls, it significantly enhances reliability for complex reasoning tasks by reducing the impact of single incorrect reasoning chains and leveraging diverse problem-solving approaches.

Visit the following resources to learn more:

- [@article@Self-Consistency - DAIR.AI](https://www.promptingguide.ai/techniques/consistency)
- [@article@Self-Consistency - LearnPrompting](https://learnprompting.org/docs/intermediate/self_consistency)