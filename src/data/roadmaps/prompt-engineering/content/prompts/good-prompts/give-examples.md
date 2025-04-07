# Give Successful Examples

In this technique, you give examples of successful behavior to the model and then ask it to continue the behavior. For example, you might give the model a few examples of successful chess moves and then ask it to continue the game.

Here is an example of a prompt that uses this technique:

```
Read the examples carefully and use them as a basis for your responses.

Input: Banana
Output: Fruit

Input: Apple
Output: Fruit

Input: Carrot
Output: Vegetable

Given the provided examples, generate the appropriate response for the following inputs:

- Turnip
- Orange
- Pear
- Potato
- Cucumber
- Celery
- Broccoli
- Cauliflower
```

The output of this prompt is:

```
- Turnip: Vegetable
- Orange: Fruit
- Pear: Fruit
- Potato: Vegetable
- Cucumber: Vegetable
- Celery: Vegetable
- Broccoli: Vegetable
- Cauliflower: Vegetable
```