# Querying Data with Django ORM

The Django ORM (Object-Relational Mapper) provides a powerful and convenient way to interact with your database. Instead of writing raw SQL queries, you use Python code to retrieve data from your models. This involves using methods like `filter()`, `get()`, `all()`, and `exclude()` on your model's manager (usually `objects`) to specify the conditions for the data you want to retrieve. These methods return QuerySets, which are lazy-evaluated collections of model instances that match your criteria.

Visit the following resources to learn more:

- [@official@Making Queries](https://docs.djangoproject.com/en/6.0/topics/db/queries/#retrieving-objects)
- [@article@An introduction to the Django ORM](https://opensource.com/article/17/11/django-orm)
- [@video@Django ORM Mastery Series](https://www.youtube.com/playlist?list=PLOLrQ9Pn6cazjoDEnwzcdWWf4SNS0QZml)