---
title: 'Task Tracker'  
description: 'Create a task tracker with a to-do list using HTML, CSS, and JavaScript.'  
isNew: false  
sort: 22  
difficulty: 'intermediate'  
nature: 'JavaScript'  
skills:  
  - 'HTML'  
  - 'CSS'  
  - 'JavaScript'  
  - 'DOM Manipulation'  
seo:  
  title: 'Build a Task Tracker with JavaScript'  
  description: 'Learn how to create a dynamic task tracker that allows users to add, complete, and delete tasks with real-time updates.'  
  keywords:  
    - 'task tracker'
    - 'to-do list'
    - 'javascript project'  
roadmapIds:  
  - 'frontend'
---

You are required to create a task tracker that lets users add new tasks, mark them as complete, or delete them. Completed tasks will be moved to the end of the list and will have strikethrough, and users can unmark tasks to return them to the pending list.

Here is the mockup of the task tracker:

[![Task Tracker](https://assets.roadmap.sh/guest/task-tracker-2diba.png)](https://assets.roadmap.sh/guest/task-tracker-2diba.png)

## Hint

Store your tasks in an array of objects, where each object represents a task with properties like description and status (completed or not). Whenever a new task is added, updated, deleted, or marked as complete/uncomplete, update the tasks array. Write a function `renderTasks` which will remove all tasks from the DOM and re-render them based on the updated tasks array.

This project will help you practice array manipulation, event handling, and dynamic DOM updates using JavaScript.