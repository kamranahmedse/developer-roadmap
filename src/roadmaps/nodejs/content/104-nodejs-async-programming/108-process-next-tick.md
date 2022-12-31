# process.nextTick()

Every time the event loop takes a full trip, we call it a tick. When we pass a function to `process.nextTick()`, we instruct the engine to invoke this function at the end of the current operation before the next event loop tick starts.

{% resources %}
  {% Blog "https://nodejs.dev/en/learn/understanding-processnexttick/", "Understanding Process.NextTick()" %}
  {% Blog "https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/", "The Node.js process.nextTick()" %}
  {% Blog "https://www.youtube.com/watch?v=-niA5XOlCWI", "The process.nextTick Function" %}
{% endresources %}
