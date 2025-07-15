# Planner Executor

A **planner-executor agent** is a type of AI agent that splits its work into two clear parts: planning and execution. The **planner** thinks ahead, taking a goal and breaking it down into a sequence of steps, ordering them in a logical and efficient manner. The **executor**, on the other hand, takes each planned step and carries it out, monitoring the results and reporting back to the planner. If something fails or the world changes, the planner may update the plan, and the executor follows the new steps. This modular approach allows the agent to handle complex tasks by dividing them into manageable parts, making it easier to debug, reuse plans, and maintain clear and consistent behavior.

Visit the following resources to learn more:

- [@article@Plan-and-Execute Agents](https://blog.langchain.dev/planning-agents/)
- [@article@Plan and Execute: AI Agents Architecture](https://medium.com/@shubham.ksingh.cer14/plan-and-execute-ai-agents-architecture-f6c60b5b9598)