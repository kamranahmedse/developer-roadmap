# Migrations

Migrations in Django are a way to propagate changes you make to your models (like adding a field, deleting a model, etc.) into your database schema. They are essentially Python files that describe how to alter your database tables to match the current state of your models. Django uses these files to keep your database schema in sync with your application's models over time.