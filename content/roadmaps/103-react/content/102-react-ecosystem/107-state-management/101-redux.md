# Redux

Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as [live code editing combined with a time traveling debugger](https://github.com/reduxjs/redux-devtools).

<ResourceGroupTitle>Free Content</ResourceGroupTitle>

<BadgeLink colorScheme='yellow' badgeText='Read' href='https://redux.js.org/'>Official Website</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://redux.js.org/introduction/getting-started'>Official Getting Started to Redux</BadgeLink>
<BadgeLink colorScheme='blue' badgeText='Official Website' href='https://redux-toolkit.js.org'>Redux Toolkit Official Website</BadgeLink>
<BadgeLink colorScheme='green' badgeText='Course' href='https://redux.js.org/tutorials/essentials/part-1-overview-concepts'>Official Tutorial to Learn Redux</BadgeLink>
<BadgeLink colorScheme='green' badgeText='Course' href='https://egghead.io/courses/fundamentals-of-redux-course-from-dan-abramov-bd5cc867'>Fundamentals of Redux Course from Dan Abramov</BadgeLink>
<BadgeLink colorScheme='green' badgeText='Course' href='https://youtube.com/watch?v=zrs7u6bdbUw'>Redux Tutorial - Beginner to Advanced</BadgeLink>


# What are the benefits of using Redux?

There are many benefits to using Redux. The most prominent benefit is improved state management for your application. Yet, there are many other ones :

- **Easy debugging and testing**. You can use the Redux DevTools or log the state to understand better what’s happening in your application.
- **Reducer functions can be tested quickly**. As reducer functions are pure functions, they produce the same output for the same input. Therefore, testing pure functions become a simple task.
- The state of the whole application is stored in an **object tree** within a **single store**

There are some other cases and you don’t need Redux to manage the state of your application.

- Applications that consist of mostly **simple UI changes** most often don’t require a complicated pattern like Redux
- You can avoid using Redux if your data comes from a **single data source per view**. In other words, if you don’t require data from multiple sources, there’s no need to introduce Redux
