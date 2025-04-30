# Short Term  Memory

Short term memory are the facts which are passed as a part of the prompt to the LLM e.g. there might be a prompt like below:


```
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