# Red/Black Trees

In computer science, a red–black tree is a kind of self-balancing binary search tree. Each node stores an extra bit representing "color", used to ensure that the tree remains balanced during insertions and deletions.

These are a translation of a 2-3 tree (see below).

In practice: Red–black trees offer worst-case guarantees for insertion time, deletion time, and search time. Not only does this make them valuable in time-sensitive applications such as real-time applications, but it makes them valuable building blocks in other data structures which provide worst-case guarantees; for example, many data structures used in computational geometry can be based on red–black trees, and the Completely Fair Scheduler used in current Linux kernels uses red–black trees. In the version 8 of Java, the Collection HashMap has been modified such that instead of using a LinkedList to store identical elements with poor hashcodes, a Red-Black tree is used.

{% resources %}
  {% Blog "https://en.wikipedia.org/wiki/Red%E2%80%93black_tree", "Red-Black Tree - Wikipedia" %}
  {% Blog "https://www.topcoder.com/thrive/articles/An%20Introduction%20to%20Binary%20Search%20and%20Red-Black%20Trees", "An Introduction To Binary Search And Red Black Tree" %}
  {% Blog "https://www.youtube.com/playlist?list=PL9xmBV_5YoZNqDI8qfOZgzbqahCUmUEin", "Red-Black Trees (playlist) in 30 minutes" %}
  {% Blog "https://youtu.be/1W3x0f_RmUo?list=PLFDnELG9dpVxQCxuD-9BSy2E7BWY3t5Sm&t=3871", "Aduni - Algorithms - Lecture 4 (link jumps to starting point)" %}
  {% Blog "https://www.youtube.com/watch?v=hm2GHwyKF1o&list=PLFDnELG9dpVxQCxuD-9BSy2E7BWY3t5Sm&index=5", "Aduni - Algorithms - Lecture 5" %}
{% endresources %}
