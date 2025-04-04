# Workout its Solution

LLM Models try to jump to solutions as soon as possible. They are not interested in the process of solving a problem. Sometimes giving strict instructions help get better results.

The main idea is that sometimes, if we just ask a model if something is right or wrong, it can quickly answer without thinking much, and give a wrong answer.
Therefore, it is better to ask it to first solve the problem from scratch, step by step, and then compare with the given solution. This increases the likelihood that you will detect errors.

Here is an example of a prompt using this technique:
```
Determine whether the student's solution is correct or not.

Problem Statement: I am organizing an event and need to calculate the total cost.
- The venue rental costs $50 per person.
- The food costs $30 per person.
- The decorations cost $500 fixed, plus $5 per person.
What is the total cost of the event as a function of the number of people?

Student's solution: Let n be the number of people.
1. Rental: 50n
2. Food: 30n
3. Decoration: 500 + 50n
Total cost: 50n + 30n + 500 + 50n = 130n + 500
```
This would be the LLM's response:
```
The student's solution is correct.
```
But the student's solution is actually not correct! We can get the model to notice this if we ask it to first solve the problem for itself.
```
First solve the problem yourself. Then compare your solution with the student's solution and evaluate whether it is correct or not. Do not decide if the student's solution is correct until you have done the problem yourself.
Problem Statement: I am organizing an event and need to calculate the total cost of the event.
- The venue rental costs $50 per person.
- The food costs $30 per person.
- The decorations cost $500 fixed, plus $5 per person.
What is the total cost of the event as a function of the number of people?

Student's solution: Let n be the number of people.
1. Rental: 50n
2. Food: 30n
3. Decoration: 500 + 50n
Total cost: 50n + 30n + 500 + 50n = 130n + 500
```

Now the LLM's answer would be as follows:

```
Let n be the number of people attending the event.
1. Rental: 50n
2. Food: 30n
3. Decoration: 500 + 50n
Total cost: 50n + 30n + 500 + 50n = 85n + 500

The student's solution is incorrect. He made a mistake in calculating the cost of the decorations, using 50x instead of 5x. The correct total cost for the event is 85n + 500.
```
