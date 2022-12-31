# global keyword

In browsers, the top-level scope is the global scope. This means that within the browser var something will define a new global variable. In Node.js this is different. The top-level scope is not the global scope; `var something` inside a Node.js module will be local to that module.

{% resources %}
  {% Blog "https://nodejs.org/api/globals.html#global", "global Keyword in Node.js" %}
  {% Blog "https://www.youtube.com/watch?v=jn8PZNBmKm0", "What is Global Object?" %}
  {% Blog "https://www.youtube.com/watch?v=PY-AycMkEAg", "Global Object in Node" %}
{% endresources %}