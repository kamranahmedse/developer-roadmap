# Improving Reliability

To a certain extent, most of the previous techniques covered have to do with improving completion accuracy, and thus reliability, in particular self-consistency. However, there are a number of other techniques that can be used to improve reliability, beyond basic prompting strategies.

LLMs have been found to be more reliable than we might expect at interpreting what a prompt is trying to say when responding to misspelled, badly phrased, or even actively misleading prompts. Despite this ability, they still exhibit various problems including hallucinations, flawed explanations with CoT methods, and multiple biases including majority label bias, recency bias, and common token bias. Additionally, zero-shot CoT can be particularly biased when dealing with sensitive topics.

Common solutions to some of these problems include calibrators to remove a priori biases, and verifiers to score completions, as well as promoting diversity in completions.

Learn more at [learnprompting.org](https://learnprompting.org/docs/reliability/intro)
