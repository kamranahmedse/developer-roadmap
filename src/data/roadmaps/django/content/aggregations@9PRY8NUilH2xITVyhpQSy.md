# Aggregations

Aggregations in Django allow you to summarize data from multiple objects in your database. They compute a single summary value (like average, sum, or count) for a group of objects. Unlike annotations, which add a field to each object in a queryset, aggregations return a single value for the entire queryset. So, annotations add extra data to each item, while aggregations give you a summary of the whole collection.

Visit the following resources to learn more:

- [@official@Aggregation](https://docs.djangoproject.com/en/6.0/topics/db/aggregation/)
- [@article@QuerySets and aggregations in Django](https://blog.logrocket.com/querysets-and-aggregations-in-django/)
- [@article@Django Annotate and aggregate explained](https://coffeebytes.dev/en/django/django-annotate-and-aggregate-explained/)
- [@video@Django Aggregation & Annotation / values() and values_list() functions](https://www.youtube.com/watch?v=LEsmHKZLsBI)