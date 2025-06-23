---
order: 1
briefTitle: 'SQL Queries'
briefDescription: 'Writing SQL queries on the spot is tough. This guide covers 30 common SQL queries interview questions with examples, code snippets, and explanations.'
title: '30 SQL Queries Interview Questions and Answers'
description: 'Writing SQL queries on the spot is tough. This guide covers 30 common SQL queries interview questions with examples, code snippets, and explanations.'
authorId: 'ekene'
ending: 'sql-queries-ending.md'
isNew: true
date: 2025-06-17
seo:
  title: '30 SQL Queries Interview Questions and Answers'
  description: 'Writing SQL queries on the spot is tough. This guide covers 30 common SQL queries interview questions with examples, code snippets, and explanations.'
  ogImageUrl: 'https://assets.roadmap.sh/guest/sql-queries-interview-questions-and-answers-q3qua.jpg'
  keywords: 
    - 'sql quiz' 
    - 'sql questions' 
    - 'sql interview questions' 
    - 'sql interview' 
    - 'sql test'
sitemap:
  priority: 1
  changefreq: 'monthly'
questions:
    - question: What is the difference between WHERE and HAVING?
      answer: where-vs-having.md
      topics:
      - 'Foundational SQL Queries'
    - question: How do you find duplicates in a table?
      answer: find-duplicates.md
      topics:
      - 'Foundational SQL Queries'
    - question: What is the difference between INNER JOIN and LEFT JOIN?
      answer: inner-join-vs-left-join.md
      topics:
      - 'Foundational SQL Queries'
    - question: Write a query to find the second highest salary from a table
      answer: second-highest-salary.md
      topics:
      - 'Foundational SQL Queries'
    - question: What is the difference between UNION and UNION ALL?
      answer: union-vs-union-all.md
      topics:
      - 'Foundational SQL Queries'
    - question: What are indexes and why are they useful?
      answer: indexes-usefulness.md
      topics:
      - 'Foundational SQL Queries'
    - question: What is a primary key?
      answer: primary-key.md
      topics:
      - 'Foundational SQL Queries'
    - question: What is a foreign key?
      answer: foreign-key.md
      topics:
      - 'Foundational SQL Queries'
    - question: How does GROUP BY work?
      answer: group-by-work.md
      topics:
      - 'Aggregation and grouping'
    - question: What happens if you SELECT a column not in the GROUP BY clause?
      answer: select-non-grouped-column.md
      topics:
      - 'Aggregation and grouping'
    - question: Write a query to COUNT the number of users by country
      answer: count-users-by-country.md
      topics:
      - 'Aggregation and grouping'
    - question: What happens if you use GROUP BY without an aggregate function?
      answer: group-by-without-aggregate.md
      topics:
      - 'Aggregation and grouping'
    - question: What is the difference between COUNT(\*) and COUNT(column_name)?
      answer: count-star-vs-count-column.md
      topics:
      - 'Aggregation and grouping'
    - question: What is the difference between a subquery and a JOIN?
      answer: subquery-vs-join.md
      topics:
      - 'Subqueries and nested logic'
    - question: Write a query to find employees earning more than the average salary
      answer: employees-above-average-salary.md
      topics:
      - 'Subqueries and nested logic'
    - question: Explain how a correlated subquery works
      answer: correlated-subquery.md
      topics:
      - 'Subqueries and nested logic'
    - question: When should you use EXISTS instead of IN in a subquery?
      answer: exists-vs-in.md
      topics:
      - 'Subqueries and nested logic'
    - question: Can you nest subqueries multiple levels deep?
      answer: nested-subqueries.md
      topics:
      - 'Subqueries and nested logic'
    - question: What is a window function?
      answer: window-function.md
      topics:
      - 'Window functions and advanced queries'
    - question: Write a query to calculate a running total
      answer: running-total.md
      topics:
      - 'Window functions and advanced queries'
    - question: What is the difference between RANK(), DENSE_RANK(), and ROW_NUMBER()?
      answer: rank-dense-rank-row-number.md
      topics:
      - 'Window functions and advanced queries'
    - question: What is LAG() and LEAD() in SQL? Give an example use case
      answer: lag-lead-functions.md
      topics:
      - 'Window functions and advanced queries'
    - question: How will you detect gaps in a sequence of dates per user?
      answer: detect-date-gaps.md
      topics:
      - 'Window functions and advanced queries'
    - question: What does the NTILE() function do, and how might it be useful in analyzing data?
      answer: ntile-function.md
      topics:
      - 'Window functions and advanced queries'
    - question: How would you optimize slow-running queries?
      answer: optimize-slow-queries.md
      topics:
      - 'Optimization and pitfalls'
    - question: Why should you avoid SELECT \* in production code?
      answer: avoid-select-star.md
      topics:
      - 'Optimization and pitfalls'
    - question: What is the impact of missing indexes?
      answer: missing-indexes-impact.md
      topics:
      - 'Optimization and pitfalls'
    - question: What is a SARGable query?
      answer: sargable-query.md
      topics:
      - 'Optimization and pitfalls'
    - question: What are some common mistakes when using GROUP BY?
      answer: group-by-mistakes.md
      topics:
      - 'Optimization and pitfalls'
    - question: Why can NOT IN lead to unexpected results with NULLS?
      answer: not-in-null-issues.md
      topics:
      - 'Optimization and pitfalls'
---

![SQL queries interview questions and answers](https://assets.roadmap.sh/guest/sql-queries-interview-questions-and-answers-q3qua.jpg)

Writing SQL queries during interviews can be tough for beginners and experienced developers. However, with the right preparation and practice, you can ace your next SQL queries interview.

In this guide, I'll walk you through both basic and advanced SQL queries like SELECT, JOIN, GROUP BY, and window functions. Each answer will be short and clear and include SQL code examples for you to understand the concepts better. By the end of this guide, you'll have everything you need to ace your SQL queries interview and build solid skills you can use beyond it.

I have included a set of flashcards to help you study and practice more efficiently. If you are just starting out in your career, checkout roadmap.sh's [SQL roadmap](https://roadmap.sh/sql). Also, feel free to research each question in detail to gain more insight.

## Preparing for your SQL queries interview

While preparing for your interview, you should remember the following points.

- Review the basics of SQL. You should know what SQL stands for and what it is used for.
- Make sure you have a basic understanding of databases and the different types of databases, such as SQL and NoSQL databases.
- Consider reading about the SQL data types and basic database concepts such as indexing, foreign keys, primary keys, etc.
- Practice writing SQL queries on local databases or online platforms like [HackerRank](https://www.hackerrank.com/domains/sql).
- Get familiar with at least one relational database management system such as [PostgreSQL](https://roadmap.sh/postgresql-dba), Microsoft SQL Server, MySQL, Oracle DB.
- On a general note, read up on the company you are interviewing with to know more about what they do, and also prepare some questions beforehand to show you are interested in what they do.
