## Frontend Developer Roadmap – 2018

This file contains the frontend roadmap translated in the checklist form to make it easier for others to contribute and to fork and keep a check on their progress. You can read the commentary on the frontend roadmap [in this medium article](https://medium.com/@kamranahmedse/modern-frontend-developer-in-2018-4c2072fa2b9c)

## Step 1 – Learn the Basics

> First thing that you would want to do is learn the basics which includes learning the basics of HTML, CSS and some familiarization with JavaScript syntax. 

- [ ] Learn the basics of HTML
  - [ ] Learn the basics and how to write semantic HTML
  - [ ] Understand how to divide page into sections and to structure the DOM properly
  - [ ] **Task** Make at least 5 HTML pages – focus on structure, don't worry about the *beauty* yet
- [ ] Learn the basics of CSS
  - [ ] Learn the basics of CSS
  - [ ] Learn how to use Grid and Flexbox
  - [ ] Media queries and how to make responsive websites
  - [ ] Understand CSS Specificity, Box-Model etc
  - [ ] **Task** Style the HTML pages that you made in last step
- [ ] Basics of JavaScript
  - [ ] Learn the syntax and the basic constructs
  - [ ] Learn how to manipulate DOM
  - [ ] Understand the concepts such as hoisting, event bubbling, prototypes etc
  - [ ] Learn Ajax (XHR)
  - [ ] Learn new features in ES6+ and how to write modular JavaScript
- [ ] Learn jQuery – **Optional (you can leave it for now and revisit later)**

#### Step 2 – Practice what you have learnt!

I say this a lot and I will say it here again, you don’t learn anything without practice. You might have a momentary feeling that you understand something but it would soon go away if you don’t practice. Make sure that you practice as much as you can, while you are following this roadmap.

Go ahead and make some responsive website and add interactivity with JavaScript. You can copy any existing webpage that you might find interesting but **remember to use everything that you have learnt till this point**.

#### Step 3 – Optional but Highly Recommended

Before you go any further, I would recommend you to go and learn some [git](https://git-scm.com/) if you haven't learnt already. it is really going to help you as you go further. You don't have to learn everything about it, just learn the below listed and keep learning as you continue and face any issues.

Its time to get into the real business now. Open [Github](https://github.com) and search for some projects and try to open some pull requests in some open-source projects. Some of the ideas for pull requested are listed below:
- Enhance the UI, make any demo pages responsive or improve the design
- Look at any of the open issues that you can solve
- Refactor any of the code that you think can be improved

> Link this repo and tell them you are learning and ask for feedback on your PR and how you can improve.

![](./images/split.png)

## Step 4 – Learn about Package Managers

> NPM and Yarn both are almost same in usage; you can learn one of them and you automatically learn the other.

- [ ] Learn how to use NPM
- [ ] Learn how to use Yarn
- [ ] Understand Semantic Versioning
- [ ] **Task** Install some external library using yarn or npm into the webpages that you made previously

![](./images/split.png)

## Step 5 – Learn CSS Preprocessors

> Preprocessors enrich CSS with the functionality that it isn’t capable of by default. There are different many options Sass, Less, Stylus etc. If I were to pick one, I would go for Sass. However, PostCSS has been gaining a lot of traction lately, it is a nice-to-have and is sort of “Babel” for CSS. You can use it stand-alone or on top of Sass also. I would recommend you to learn Sass for now and revisit PostCSS later when you have time.

- [ ] Pick one of these
  - [ ] **Sass (Recommended)**
  - [ ] Less
  - [ ] **PostCSS (do this later)**
  - [ ] Stylus

![](./images/split.png)

## Step 6 – Learn the Build tools

> These are the tools that help you in bundling, building and development of your frontend applications

> There used to be alot of stuff in the task runners but today I would just pick NPM scripts, however if you want to pick something else, have a look at gulp

- [ ] **NPM Scripts (Recommended)**
- [ ] Gulp

> There are several linters, but I would go for ESLint. Feel free to have a look at others and see why one over the other

- [ ] **ESLint (Recommended)**
- [ ] JSLint
- [ ] JSHint
- [ ] JSCS

> **Use Webpack for apps and Rollup for libraries**. However, you don't need rollup for now; everything that it does, you can do it with Webpack also, so go for Webpack and look into Rollup later

- [ ] **Webpack (Recommended)**
- [ ] Rollup
- [ ] Parcel

![](./images/split.png)

## Step 7 – Create something – Maybe a library

> Go to Github and Have a look at the source code of libraries that people have made, pick an idea and make some library with the below listed requirements

- [ ] It should use Sass for styling
- [ ] It should be written in ES6
- [ ] It should be a UMD library
- [ ] It should be using Babel to allow usage in older browsers

![](./images/split.png)

## Step 8 – Learn any Framework

> There are several options, when it comes to frameworks. However, below listed frameworks are the ones that I would recommend. You can pick any of them, however if you ask me for the personal picks I would choose React or Angular. However, have a look at any of them and see what you like

- [ ] **React**
  - [ ] Redux - For large scale apps and can be used outside react also
  - [ ] Mobx - For smaller apps and can be used outside react also
- [ ] **Angular (Important – Learn Angular 2+)**
  - [ ] Rx.js – Is really powerful can be used out of angular also
  - [ ] Ngrx
- [ ] Vue.js
  - [ ] Vuex - Similar to redux but for Vue 

![](./images/split.png)

## Step 9 – Practical Time

Now you know *everything* that one might need to build a modern JavaScript application. Go ahead and make some application with whatever framework you picked. You can find some of the ideas in the `ideas` directory in the repository; pick anything and start!

![](./images/split.png)

## Step 10 – Learn about Performance

Once you are done making the application from Step 9, read about how to **measure and improve performance**. For example look at **Interactivity Time**, **Page Speed Index**, and **Lighthouse Score** etc.

![](./images/split.png)

## Step 11 – Testing your Apps

There are lots and lots of different tools for different purposes. I mostly find myself using a combination of Jest, Mocha, Karma and Enzyme. However, before you jump and pick any, it would be better if you **first understand the different testing types**, look at all the options available and use the ones most suitable for your needs.

Here is a really nice summary to get you started – [An Overview of JavaScript Testing in 2018](https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2018-f68950900bc3)

- [ ] **Jest**
- [ ] **Mocha**
- [ ] **Protractor**
- [ ] **Karma**
- [ ] **Enzyme**

![](./images/split.png)

## Step 12 – Static Type Checkers

Static type checkers help you to add type checking to JavaScript. You don’t need to learn these but they really give you superpowers and can be learnt in a few hours and then you can keep . There is mainly TypeScript and Flow. I love TypeScript and would pick it but feel free to check both and pick one of your liking.

- [ ] **TypeScript (Recommended)**
- [ ] Flow

![](./images/split.png)

## Step 13 – Learn any CSS Framework

This used to be way up in the chart, but I moved it down below as they aren't really needed any more and can be mastered without much effort. If you would want to pick any, there is one under every rock. The ones that I liked the most among the ones that I tried are Bootstrap, Materialize and Bulma. But if you look at their demand in market I would pick Bootstrap if I was starting today.

- [ ] **Bootstrap (Recommended)**
- [ ] Materialize CSS
- [ ] Bulma

![](./images/split.png)

## Step 14 – Learn how to organize CSS

> As your applications grow, CSS start to become messy and unmaintainable. There are multiple ways to structure your CSS better for scalability

- [ ] **BEM – Recommended**
- [ ] OOCSS
- [ ] SMACSS
- [ ] SUITCSS
- [ ] Atomic

![](./images/split.png)

## Step 15 – Learn about Server Side Rendering

> There are different options, depending on what framework you are using

- [ ] React
  - [ ] Next.js
  - [ ] After.js
- [ ] Angular
  - [ ] Universal
- [ ] Vue.js
  - [ ] Nuxt.js

![](./images/split.png)

## Step 16 – Progressive Webapps

Learn about Service Workers and how to make Progressive Webapps

![](./images/split.png)

## Journey Never Ends

And the journey doesn't end here. There is still a lot of stuff you can learn about, you just have to keep a healthy appetite for learning and not settling.

Good luck 👏



