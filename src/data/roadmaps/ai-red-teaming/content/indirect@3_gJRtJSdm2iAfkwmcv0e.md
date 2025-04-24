# Indirect Injection

(Indirect injection involves embedding malicious prompts within external data sources that the LLM processes, such as websites, documents, or emails. AI Red Teamers test this by poisoning data sources the AI might interact with (e.g., adding hidden instructions to a webpage summarized by the AI) to see if the AI executes unintended commands or leaks data when processing that source.)

Learn more from the following resources:

- [@paper@The Practical Application of Indirect Prompt Injection Attacks - David Willis-Owen](https://www.researchgate.net/publication/382692833_The_Practical_Application_of_Indirect_Prompt_Injection_Attacks_From_Academia_to_Industry) - Discusses a standard methodology to test for indirect injection attacks.
- [@article@How to Prevent Indirect Prompt Injection Attacks - Cobalt](https://www.cobalt.io/blog/how-to-prevent-indirect-prompt-injection-attacks) - Explains indirect injection via external sources and mitigation.
- [@article@Jailbreaks via Indirect Injection (Practical AI Safety Newsletter)](https://newsletter.practicalai.safety/p/jailbreaks-via-indirect-injection) - Examples of indirect prompt injection impacting LLM agents.
