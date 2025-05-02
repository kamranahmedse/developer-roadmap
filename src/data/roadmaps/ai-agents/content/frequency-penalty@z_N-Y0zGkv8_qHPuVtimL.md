# Frequency Penalty

Frequency penalty is a setting that tells a language model, “Stop repeating yourself.” As the model writes, it keeps track of how many times it has already used each word. A positive frequency-penalty value lowers the chance of picking a word again if it has been seen many times in the current reply. This helps cut down on loops like “very very very” or long blocks that echo the same phrase. A value of 0 turns the rule off, while higher numbers make the model avoid repeats more strongly. If the penalty is too high, the text may miss common words that are still needed, so you often start low (for example 0.2) and adjust. Frequency penalty works together with other controls such as temperature and top-p to shape output that is clear, varied, and not boring.

Visit the following resources to learn more:

- [@article@Frequency Penalty Explanation](https://docs.aipower.org/docs/ai-engine/openai/frequency-penalty)
- [@article@Understanding Frequency Penalty and Presence Penalty](https://medium.com/@the_tori_report/understanding-frequency-penalty-and-presence-penalty-how-to-fine-tune-ai-generated-text-e5e4f5e779cd)