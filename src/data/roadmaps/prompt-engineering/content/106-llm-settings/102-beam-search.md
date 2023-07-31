# Beam Search

Beam search is widely used for language generation tasks and involves keeping the k most likely hypotheses at each step during decoding. The final output is determined based on the highest probability among these hypotheses. The parameter k, known as the "beam size," is critical in this process.

With a higher k, you get a more probable hypothesis. Note that when k=1, we talk about “greedy search” since we only keep the most probable hypothesis at each time step.
By default, in most applications, k is arbitrarily set between 1 and 10. Values that may seem very low.

Two main factors influence the choice of k. Firstly, increasing k increases the decoding time and memory requirements, making it more costly. Secondly, higher k may produce more probable but potentially worse results, especially for longer hypotheses, as they tend to have lower probabilities. Thus, beam search often favors shorter hypotheses, which may not be suitable for certain applications.

# Beam Size

Beam size is a hyperparameter used in decoding strategies, particularly in the context of sequence generation tasks, such as language modeling and machine translation. It determines the number of candidate sequences the model considers during the generation process. A larger beam size means the model keeps track of more possible sequences, while a smaller beam size limits the number of candidates. Beam search is a common decoding strategy that utilizes this hyperparameter.

# How Beam Size Works:
1. At each step of text generation, the model generates the top-k most likely tokens (words) based on their probabilities, where k is the beam size.
2. The model retains these top-k candidates and uses them to continue generating the next token.
3. The process continues until the generated sequences reach a predefined length or meet a specified stopping condition.
4. The final output is the sequence with the highest cumulative probability among the retained candidates.

# Use Cases

1. **Machine Translation:** In machine translation, beam size allows the model to explore multiple translation options in parallel. A larger beam size provides a broader search space, potentially capturing more diverse translations and reducing the risk of getting stuck in local optima (i.e., settling for suboptimal translations). It can lead to improved translation quality and handle ambiguity better.

2. **Text Generation and Summarization:** Beam size is crucial in text generation tasks, like story generation or summarization. By considering multiple candidates during the generation process, the model can produce more coherent and diverse outputs. This is particularly useful when there are multiple valid ways to complete a sentence or when generating summaries that cover various aspects of the input text.

3. **Speech Recognition:** In speech recognition, beam search with an appropriate beam size helps identify the most likely transcription of spoken words. By considering multiple hypotheses, the model can handle pronunciation variations and background noise better. A larger beam size increases the chances of finding the most accurate transcription, especially in challenging conditions.

# Advantages

1. **Diversity of Outputs:** Beam size allows large language models to explore different possibilities during text generation, leading to more diverse and creative outputs. This contrasts with techniques like greedy decoding, which tend to produce more deterministic and repetitive responses.

2. **Handling Ambiguity:** In situations where there are multiple plausible options for the next word or translation, beam search with an appropriate beam size helps the model consider a range of possibilities, making it less likely to commit to a suboptimal choice early on.

3. **Trade-off Between Exploration and Exploitation:** Beam size strikes a balance between exploring various options and exploiting the most probable ones. It lets the model consider a larger number of candidates without becoming overly computationally expensive, which can be a challenge with pure sampling-based methods.

Overall, beam size is a crucial hyperparameter in large language models, providing a way to control the diversity and quality of generated sequences. It allows the models to be more robust in various sequence generation tasks by exploring a broader range of possibilities while maintaining a reasonable computational overhead.
