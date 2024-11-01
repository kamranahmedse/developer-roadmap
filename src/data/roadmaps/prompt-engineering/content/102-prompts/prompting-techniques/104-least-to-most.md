# Least to Most Prompting

Least to Most prompting takes Chain of Thought (CoT) prompting a step further by first breaking a problem into sub problems then solving each one. It is a technique inspired by real-world educational strategies for children.

As in CoT prompting, the problem to be solved is decomposed in a set of subproblems that build upon each other. In a second step, these subproblems are solved one by one. Contrary to chain of thought, the solution of previous subproblems is fed into the prompt trying to solve the next problem.

## Example

Let's ask a slightly complicated customer service question:

```
CUSTOMER INQUIRY:
I just bought a T-shirt from your Arnold collection on March 1st. 
I saw that it was on discount, so bought a shirt that was originall $30, and got 40% off. 
I saw that you have a new discount for shirts at 50%. 
I'm wondering if I can return the shirt and have enough store credit to buy two of your shirts?

INSTRUCTIONS:
You are a customer service agent tasked with kindly responding to customer inquiries. 
Returns are allowed within 30 days. 
Today's date is March 29th. 
There is currently a 50% discount on all shirts. Shirt prices range from $18-$100 at your store. 
Do not make up any information about discount policies.
```

Output from the model would be:

```
Thank you for your inquiry. Unfortunately, since you purchased the shirt on March 1st, it is outside of our 30-day return policy. 
However, we do have a 50% discount on all shirts currently, so you could purchase two shirts with the same amount of store credit. 
Prices for our shirts range from $18-$100. Please let us know if you have any other questions. 
```

That failed (we are within the return time), so lets try to break it down into subproblems:

```
CUSTOMER INQUIRY:
I just bought a T-shirt from your Arnold collection on March 1st. 
I saw that it was on discount, so bought a shirt that was originall $30, and got 40% off. 
I saw that you have a new discount for shirts at 50%. I'm wondering if 
I can return the shirt and have enough store credit to buy two of your shirts?

INSTRUCTIONS:
You are a customer service agent tasked with kindly responding to customer inquiries. 
Returns are allowed within 30 days. 
Today's date is March 29th. 
There is currently a 50% discount on all shirts. 
Shirt prices range from $18-$100 at your store. 
Do not make up any information about discount policies.
What subproblems must be solved before answering the inquiry?
```

Output from the model would be:

```
1. Determine if the customer is within the 30-day return window.
2. Calculate the amount of store credit the customer would receive if they returned the shirt.
3. Calculate the cost of two shirts at the current 50% discount.
4. Determine if the customer has enough store credit to purchase two shirts.
```

Let's try to solve the first subproblem:

```
CUSTOMER INQUIRY:
I just bought a T-shirt from your Arnold collection on March 1st. 
I saw that it was on discount, so bought a shirt that was originally $30, and got 40% off. 
I saw that you have a new discount for shirts at 50%. 
I'm wondering if I can return the shirt and have enough store credit to buy two of your shirts?

INSTRUCTIONS:
You are a customer service agent tasked with kindly responding to customer inquiries. 
Returns are allowed within 30 days. 
Today's date is March 29th. 
There is currently a 50% discount on all shirts. 
Shirt prices range from $18-$100 at your store. 
Do not make up any information about discount policies.
Determine if the customer is within the 30-day return window.
Let's go step by step.
```

Output from the model would be:

```
Yes, the customer is within the 30-day return window. 
The customer purchased the shirt on March 1st, and today's date is March 29th, which is within the 30-day return window. 

Therefore, the customer is eligible to return the shirt and receive store credit for the purchase. 
The customer can use the store credit to purchase two shirts at the current 50% discount.
```

By just solving the first subproblem, we were able to solve the entire problem. If GPT-3 did not return an answer immediately, we could have solved the next subproblem and so on until it did return an answer. Note that we use Let's go step by step.. The addition of this phrase is not always necessary, but it helps for this example.

Learn more from the following resources:

- [@article@Least-to-Most Prompting](https://learnprompting.org/docs/intermediate/least_to_most)