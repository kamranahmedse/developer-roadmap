---
title: Welcome Quiz
description: Learn the basics of SQL, the language for querying databases.
order: 150
type: lesson-quiz
questions:
  - id: 1
    title: 'Which of the following SQL clauses is used to filter results after the GROUP BY clause?'
    options:
      - id: 1
        text: 'WHERE'
      - id: 2
        text: 'HAVING'
        isCorrectOption: true
      - id: 3
        text: 'GROUP BY'
      - id: 4
        text: 'ORDER BY'
  - id: 2
    title: 'Which SQL function is used to return the first non-null expression?'
    options:
      - id: 1
        text: 'COALESCE'
        isCorrectOption: true
      - id: 2
        text: 'IFNULL'
      - id: 3
        text: 'NULLIF'
      - id: 4
        text: 'NVL'
  - id: 3
    title: 'What is the purpose of an SQL CTE (Common Table Expression)?'
    options:
      - id: 1
        text: 'To create temporary tables that last for the duration of a query'
        isCorrectOption: true
      - id: 2
        text: 'To define reusable views'
      - id: 3
        text: 'To encapsulate subqueries'
      - id: 4
        text: 'To optimize the execution of queries'
  - id: 4
    title: 'In an SQL window function, which clause defines the subset of rows to apply the function on?'
    options:
      - id: 1
        text: 'ORDER BY'
      - id: 2
        text: 'PARTITION BY'
        isCorrectOption: true
      - id: 3
        text: 'GROUP BY'
      - id: 4
        text: 'DISTINCT'
  - id: 5
    title: 'Which SQL join returns all rows when there is a match in either of the tables?'
    options:
      - id: 1
        text: 'INNER JOIN'
      - id: 2
        text: 'LEFT JOIN'
      - id: 3
        text: 'RIGHT JOIN'
      - id: 4
        text: 'FULL OUTER JOIN'
        isCorrectOption: true
---

The SQL language is widely used today across web frameworks and database applications. Knowing SQL gives you the freedom to explore your data, and the power to make better decisions. By learning SQL, you will also learn concepts that apply to nearly every data storage system.

The statements covered in this course use SQLite Relational Database Management System (RDBMS). You can also access a glossary of all the SQL commands taught in this course.
