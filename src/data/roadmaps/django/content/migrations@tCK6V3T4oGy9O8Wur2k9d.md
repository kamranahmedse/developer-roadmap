# Migrations

Migrations are Django's way of propagating changes you make to your models (like adding a field, deleting a model, etc.) into your database schema. They are essentially files that contain instructions on how to modify your database to match your model definitions. These files are generated based on the differences between your current models and the last known state of your database, allowing you to evolve your database schema over time in a controlled and reversible manner.

Visit the following resources to learn more:

- [@official@Migrations](https://docs.djangoproject.com/en/6.0/topics/migrations/)
- [@official@Migration Operations](https://docs.djangoproject.com/en/6.0/ref/migration-operations/)
- [@article@Mastering Django Migrations: A Complete Beginner’s Guide](https://medium.com/simform-engineering/mastering-django-migrations-a-complete-beginners-guide-a50d29924c7c)
- [@article@Squashing Django Migrations the Easy Way](https://jacklinke.com/squashing-django-migrations-the-easy-way)
- [@video@Django - What are migrations - actually? Introduction to migrations and the Django database](https://www.youtube.com/watch?v=N4gjiJumTZg)