# Short Term  Memory

Short term memory are the facts which are passed as a part of the prompt to the LLM e.g. there might be a prompt like below:

```text
Users Profile:
- name: {name}
- age: {age}
- expertise: {expertise}

User is currently learning about {current_topic}. User has some goals in mind which are:
- {goal_1}
- {goal_2}
- {goal_3}

Help the user achieve the goals.
```

Notice how we injected the user's profile, current topic and goals in the prompt. These are all short term memories.

Visit the following resources to learn more:

- [@article@Memory Management in AI Agents](https://python.langchain.com/docs/how_to/chatbots_memory/)  
- [@article@Build Smarter AI Agents: Manage Short-term and Long-term Memory](https://redis.io/blog/build-smarter-ai-agents-manage-short-term-and-long-term-memory-with-redis/)
- [@article@Storing and Retrieving Knowledge for Agents](https://www.pinecone.io/learn/langchain-retrieval-augmentation/)  
- [@article@Short-Term vs Long-Term Memory in AI Agents](https://adasci.org/short-term-vs-long-term-memory-in-ai-agents/)
- [@video@Building Brain-Like Memory for AI Agents](https://www.youtube.com/watch?v=VKPngyO0iKg)  
