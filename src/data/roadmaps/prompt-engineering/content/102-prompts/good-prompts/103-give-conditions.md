# Give Conditions

Giving conditions and then asking the model to follow those conditions helps steer the model's responses toward specific behaviors or outcomes.

For example, you might give the model some long recipe text and ask it to extract the steps from the recipe or to return something else if the no receipe found in the text. In this way, you are making the output conditional giving the model some additional context.

```
You will be provided with text delimited by triple quotes. 
If it contains a sequence of instructions, \ 
re-write those instructions in the following format:

Step 1 - ...
Step 2 - …
…
Step N - …

If the text does not contain a sequence of instructions, \ 
then simply write \"No steps provided


"""INSERT YOUR RECIPE TEXT HERE"""
```

