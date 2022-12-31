# Scope and function stack

## Scope
A space or environment in which a particular variable or function can be accessed or used. Accessibility of this variable or function depends on where it is defined.

JavaScript has the following kinds of scopes:
- **Global scope**: The default scope for all code running in script mode.
- **Module scope**: The scope for code running in module mode.
- **Function scope**: The scope created with a function.
- **Block scope**: The scope created with a pair of curly braces (a block).

## Function Stack (Call stack)
The function stack is how the interpreter keeps track of its place in a script that calls multiple functions, like which function is currently executing and which functions  within that function are being called.

{% resources %}
  {% Blog "https://developer.mozilla.org/en-US/docs/Glossary/Call_stack", "Function stack (call stack) - MDN" %}
  {% Blog "https://developer.mozilla.org/en-US/docs/Glossary/Scope", "Kinds of Scope - MDN" %}
{% endresources %}
