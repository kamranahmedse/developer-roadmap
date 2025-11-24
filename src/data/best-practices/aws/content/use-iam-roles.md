# Use IAM Roles

Don't create users for application, always use IAM roles if you can. They simplify everything, and keeps things secure. Having application users just creates a point of failure (what if someone accidentally deletes the API key?) and it becomes a pain to manage.
