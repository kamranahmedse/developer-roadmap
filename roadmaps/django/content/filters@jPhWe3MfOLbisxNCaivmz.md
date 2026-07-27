# Logging Filters

Filters in Django's logging framework provide a way to add extra control over which log records are processed by a handler. They determine whether a specific log record should be emitted based on criteria you define. This allows you to selectively include or exclude log messages based on attributes like the logger name, log level, or any other custom logic you implement. Filters are attached to handlers, and a handler will only process a log record if all of its filters allow it.

Visit the following resources to learn more:

- [@official@Filters](https://docs.djangoproject.com/en/6.0/topics/logging/#topic-logging-parts-filters)
- [@article@Logging in Django — Part II [Filters and Formatters]](https://medium.com/django-unleashed/logging-in-django-part-ii-filters-and-formatters-c7190d360ab2)