# Anthropic Tool Use

Anthropic Tool Use lets you connect a Claude model to real software functions so the agent can do useful tasks on its own. You give Claude a list of tools, each with a name, a short description, and a strict JSON schema that shows the allowed input fields. During a chat you send user text plus this tool list. Claude decides if a tool should run, picks one, and returns a JSON block that matches the schema. Your code reads the JSON, calls the matching function, and sends the result back to Claude for the next step. This loop repeats until no more tool calls are needed. Clear schemas, small field sets, and helpful examples make the calls accurate. By keeping the model in charge of choosing tools while your code controls real actions, you gain both flexibility and safety.

Visit the following resources to learn more:

- [@official@Anthropic Tool Use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview)
