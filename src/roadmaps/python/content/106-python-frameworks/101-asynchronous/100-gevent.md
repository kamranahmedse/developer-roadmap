# gevent

gevent is a Python library that provides a high-level interface to the event loop.
It is based on non-blocking IO (libevent/libev) and lightweight greenlets. Non-blocking IO means requests waiting for network IO won't block other requests; greenlets mean we can continue to write code in synchronous style.

{% resources %}
  {% Official "http://www.gevent.org/", "gevent — Official Website" %}
  {% Blog "https://github.com/gevent/gevent", "GitHub Repository" %}
  {% Blog "https://sdiehl.github.io/gevent-tutorial/", "gevent For the Working Python Developer" %}
{% endresources %}
