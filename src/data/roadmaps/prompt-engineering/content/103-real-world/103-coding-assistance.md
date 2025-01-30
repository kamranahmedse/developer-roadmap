# Coding Assistance

Large Language Models (LLMs) tailored for coding have become invaluable tools for developers, offering a wide range of functionalities to assist in coding tasks. These include debugging, code generation, reformatting and reviewing, translating between programming languages, refactoring code, program simulations, and generating unit tests. Recent advancements have expanded their capabilities to include code optimization, documentation generation, bug fixing, project management assistance, security analysis, and version control support. New features also allow users to interact with outputs directly, such as editing or refining code suggestions with or without additional prompts, like OpenAI's Canvas or Anthropic's Artefacts. These advancements make LLMs' capabilities available across the software development process, enhancing productivity and streamlining workflows across various stages of coding and project management.

## Code Generation

Instructing ChatGPT to generate code is as simple as this:

```
Act as a junior python programmer. Please write the code to generate madlibs from 3 arrays of 6 items each: prepositions, verbs and nouns, with the nouns also being used as direct objects. After writing it, execute the code.
```

The output will be something like:

```python
import random

prepositions = ['at', 'in', 'on', 'with', 'under', 'over']
verbs = ['run', 'jump', 'dance', 'sing', 'laugh', 'cry']
nouns = ['cat', 'dog', 'tree', 'flower', 'book', 'computer']

preposition = random.choice(prepositions)
verb = random.choice(verbs)
noun = random.choice(nouns)

madlib = f"I {verb} {preposition} the {noun}."

print(madlib)

```

## Commenting and Reformatting Code

You can ask ChatGPT to add comments to your code, and reformat it for legibility. After your prompt instruction, add three hashmarks and then paste in the code you'd like it to clean up:

```
Please add line comments to this Python code and reformat it for legibility:  

import math
amplitude = 30
frequency = 2
num_points = 50
for i in range(num_points):
    y = int(round(amplitude * math.sin(2 * math.pi * frequency * i / num_points)))
    print(' ' * (amplitude + y) + '*')
```

The output will be something like:

```python
# Import the math module
import math

# Set the amplitude, frequency, and number of points in the wave
amplitude = 30
frequency = 2
num_points = 50

# Loop over each point in the wave
for i in range(num_points):
    # Calculate the y value of the wave using the sine function from the math module
    y = int(round(amplitude * math.sin(2 * math.pi * frequency * i / num_points)))
    
    # Print a space for padding, followed by an asterisk at the appropriate position on the wave
    print(' ' * (amplitude + y) + '*')

```

## Debugging

Not only can ChatGPT detect syntax errors in code, but it can also find logical errors that would crop up when code is executed. Below is an example of a Python script that eventually causes a division by zero error on line 4 due to a logical error on line 3. Try this simple prompt to find and fix the error:

```
Please debug this Python code:  

1. pizza_cost = 100
2. partygoers = 10
3. while partygoers = 0:
4.    cost_per_person = pizza_cost / partygoers
5.    print("the cost per person is $", "{:.2f}".format(cost_per_person))
6.    partygoers -= 2
```

The output will include the corrected while loop, which is changed to ensure the denominator variable stays positive:

```
3. while partygoers > 0:
```

For more nuanced errors, you may need to add more specifics: the error message, environment variables, included libraries or variations in inputs.

## Optimizing Code

If your script is taking too long to execute, ChatGPT can optimize it. Here's an example of optimizing an inefficient script that finds prime numbers:

```
Act like a very senior python developer. Please optimize this script:  

for num in range(1, 101):
    if num  1:
        for i in range(2, num):
            if (num % i) == 0:
                break
        else:
            print(num)
```
The output might be a script that uses the Sieve of Eratosthenes algorithm for finding prime numbers:

```python
numbers = list(range(2, 101))
for i in numbers:
    for j in range(i * 2, 101, i):
        if j in numbers:
            numbers.remove(j)
print(numbers)

```

Note that we asked the bot to "act like a senior developer" to optimize the script. You can also dictate that it have a certain area of expertise (e.g., sorting algorithms) or number of years of experience. Alternatively, if you have a script that seems overly complicated, you can ask ChatGPT to write that script "as a very junior developer."

## Translating Between Programming Languages

A very useful feature ChatGPT offers is the ability to port programs from one language to another. A typical use for this might be upgrading code in an older language to a more modern one:

```
Act like an experienced developer with knowledge of both COBOL and Python. Please convert this COBOL program to Python:  


IDENTIFICATION DIVISION.
PROGRAM-ID. CALCULATE-SS-TAX.

DATA DIVISION.
WORKING-STORAGE SECTION.
01 SALARY PIC 9(7)V99.
01 SS-TAX PIC 9(7)V99.

PROCEDURE DIVISION.
DISPLAY "Enter employee's salary: ".
ACCEPT SALARY.

COMPUTE SS-TAX = SALARY * 0.062.

DISPLAY "Social Security tax is: $", SS-TAX.
STOP RUN.
```

The output might be something like this:

```python
salary = float(input("Enter employee's salary: "))
ss_tax = salary * 0.062

print("Social Security tax is: $", round(ss_tax, 2))

```

Learn more from the following resources:

- [@article@LLM Coding Assistance](https://learnprompting.org/docs/basic_applications/coding_assistance)
- [@guides@Generating Code | Prompt Engineering Guide](https://www.promptingguide.ai/applications/coding)
- [@article@Prompt engineering 101 for developers](https://www.pluralsight.com/resources/blog/software-development/prompt-engineering-for-developers)
- [@guide@Prompt Engineering for Coding Tasks ](https://towardsdatascience.com/prompt-engineering-llms-coding-chatgpt-artificial-intelligence-c16620503e4e)
- [@article@How GenAI Transforms Software Development: 11 Use Cases](https://www.index.dev/blog/11-generative-ai-use-cases-software-development)