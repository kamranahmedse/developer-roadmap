---
title: Next Steps
description: Learn the basics of SQL, the language for querying databases.
order: 170
type: lesson
---

Now that we have got the theoretical part out of the way, let's dive into the practical part of SQL. In our next chapter, we will learn about the basics of SQL; we will cover the basics of selecting data from a database. This will give you a taste of what SQL is and how it works preparing you for the next chapters covering more complex topics.

---

## Coding Environment

We don't expect you to have a database setup on your local machine. All our lessons will have the coding environment setup with the database ready for you to use and practice. We will be using a hypothetical pre-populated databases throughout this course to help you learn SQL. Additional things to note about the coding environment:

- Our database environment is not persistent. This means that if you close the browser or refresh the page, the database will be reset to its original state.
- We are using PostgreSQL for our coding environment. The concepts we will be covering, however, are the same for any other database and you are not required to know anything about PostgreSQL to follow this course.

### Important Note on Running Snippets

Before you continue, please keep in mind that every time you click the "Run" button, the **database resets to its initial state after the snippet is executed**. This means:

- All previous commands and their effects are cleared
- You start with a fresh, empty database
- Only the commands in your current snippet will be executed

For example, this sequence will not work:

```sql
-- First Run
CREATE TABLE users (id INT, name TEXT);
-- Second Run
INSERT INTO users VALUES (1, 'Alice');
-- Third Run
SELECT * FROM users;
```

The `INSERT` query will fail because the table `users` will be dropped after the first run.

Instead, combine all related commands into a single snippet:

```sql
-- All commands in one run:
CREATE TABLE users (id INT, name TEXT);
INSERT INTO users VALUES (1, 'Alice');
SELECT * FROM users;
```

---


See you in the next chapter!
