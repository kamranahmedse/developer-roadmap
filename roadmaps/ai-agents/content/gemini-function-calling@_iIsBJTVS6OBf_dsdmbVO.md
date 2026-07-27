# Gemini Function Calling

Gemini function calling lets you hook the Gemini language model to real code in a safe and simple way. You first list the functions you want it to use, each with a name, a short note about what it does, and a JSON schema for the needed arguments. When the user speaks, Gemini checks this list and, if a match makes sense, answers with a tiny JSON block that holds the chosen function name and the filled-in arguments. Your program then runs that function, sends the result back, and the chat moves on. Because the reply is strict JSON and not free text, you do not have to guess at what the model means, and you avoid many errors. This flow lets you build agents that pull data, call APIs, or carry out long action chains while keeping control of business logic on your side.

Visit the following resources to learn more:

- [@official@Function Calling with the Gemini API](https://ai.google.dev/gemini-api/docs/function-calling)
- [@article@Understanding Function Calling in Gemini](https://medium.com/google-cloud/understanding-function-calling-in-gemini-3097937f1905)