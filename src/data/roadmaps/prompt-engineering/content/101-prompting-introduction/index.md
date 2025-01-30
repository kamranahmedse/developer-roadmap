# Introduction to Prompting

Prompting is the process of giving a model a "prompt" or instruction for the task that you want it to perform. For example, if you have some English text that you may want to translate to French, you could give the following prompt:

```
Translate the text delimited by triple quotes from English to French: 

"""Hello, how are you?"""
```

The model will then generate the following output:

```
Bonjour, comment allez-vous?
```

In this example, we gave the model a prompt with instructions to perform a task. If you notice, we followed a special way to write our prompt. We could simply give it the following prompt and it would have still worked:

```
Translate the following to French:

Hello, how are you?
```

But it's one of the best practices to be clear and use delimiters to separate the content in prompt from the instructions. You will learn more about it in the "Best Practices" nodes of the roadmap.

- [@article@Basic Prompting - Learn Prompting](https://learnprompting.org/docs/basics/intro)
- [@guides@Basics of Prompting - Prompt Engineering Guide](https://www.promptingguide.ai/introduction/basics)