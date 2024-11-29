---
title: 'Brief History of JavaScript'
description: 'How JavaScript was introduced and evolved over the years'
authorId: 'kamran'
seo:
  title: 'Brief History of JavaScript - roadmap.sh'
  description: 'How JavaScript was introduced and evolved over the years'
isNew: false
type: 'textual'
date: 2017-10-28
sitemap:
  priority: 0.7
  changefreq: 'weekly'
tags:
  - 'guide'
  - 'textual-guide'
  - 'guide-sitemap'
---

Around 10 years ago, Jeff Atwood (the founder of stackoverflow) made a case that JavaScript is going to be the future and he coined the “Atwood Law” which states that _Any application that can be written in JavaScript will eventually be written in JavaScript_. Fast-forward to today, 10 years later, if you look at it rings truer than ever. JavaScript is continuing to gain more and more adoption.

### JavaScript is announced

JavaScript was initially created by [Brendan Eich](https://twitter.com/BrendanEich) of Netscape and was first announced in a press release by Netscape in 1995. It has a bizarre history of naming; initially it was named `Mocha` by the creator, which was later renamed to `LiveScript`. In 1996, about a year later after the release, NetScape decided to rename it to be `JavaScript` with hopes of capitalizing on the Java community (although JavaScript did not have any relationship with Java) and released Netscape 2.0 with the official support of JavaScript.

### ES1, ES2 and ES3

In 1996, Netscape decided to submit it to [ECMA International](https://en.wikipedia.org/wiki/Ecma_International) with the hopes of getting it standardized. First edition of the standard specification was released in 1997 and the language was standardized. After the initial release, `ECMAScript` was continued to be worked upon and in no-time two more versions were released ECMAScript 2 in 1998 and ECMAScript 3 in 1999.

### Decade of Silence and ES4

After the release of ES3 in 1999, there was a complete silence for a decade and no changes were made to the official standard. There was some work on the fourth edition in the initial days; some of the features that were being discussed included classes, modules, static typings, destructuring etc. It was being targeted to be released by 2008 but was abandoned due to political differences concerning language complexity. However, the vendors kept introducing the extensions to the language and the developers were left scratching their heads — adding polyfills to battle compatibility issues between different browsers.

### From silence to ES5

Google, Microsoft, Yahoo and other disputers of ES4 came together and decided to work on a less ambitious update to ES3 tentatively named ES3.1. But the teams were still fighting about what to include from ES4 and what not. Finally, in 2009 ES5 was released mainly focusing on fixing the compatibility and security issues etc. But there wasn’t much of a splash in the water — it took ages for the vendors to incorporate the standards and many developers were still using ES3 without being aware of the “modern” standards.

### Release of ES6 — ECMAScript 2015

After a few years of the release of ES5, things started to change, TC39 (the committee under ECMA international responsible for ECMAScript standardization) kept working on the next version of ECMAScript (ES6) which was originally named ES Harmony, before being eventually released with the name ES2015. ES2015 adds significant features and syntactic sugar to allow writing complex applications. Some of the features that ES6 has to offer include

- Classes, Modules, Arrows
- Enhanced object literals
- Template strings
- Destructuring
- Default and rest parameters
- Spread operator
- `let` and `const`
- Iterators `for..of`
- Generators
- `map` and `set`
- Proxies and Symbols
- Promises
- Math, Number, String, Array, Object APIs and [etc](http://es6-features.org/#Constants)

Browser support for ES6 is still scarce but everything that ES6 has to offer is still available to developers by transpiling the ES6 code to ES5. With the release of 6th version of ECMAScript, TC39 decided to move to yearly model of releasing updates to ECMAScript so to make sure that the new features are added as soon as they are approved and we don’t have to wait for the full specification to be drafted and approved — thus 6th version of ECMAScript was renamed as ECMAScript 2015 or ES2015 before the release in June 2015. And the next versions of ECMAScript were decided to published in June of every year.

### Release of ES7 — ECMAScript 2016

In June 2016, seventh version of ECMAScript was released. As ECMAScript has been moved to an yearly release model, ECMAScript 2016 (ES2016) comparatively did not have much to offer. ES2016 includes just two new features

- Exponentiation operator `**`
- `Array.prototype.includes`

### Release of ES8 — ECMAScript 2017

The eighth version of ECMAScript was released in June 2017. The key highlight of ES8 was the addition of async functions. Here is the list of new features in ES8

- `Object.values()` and `Object.entries()`
- String padding i.e. `String.prototype.padEnd()` and `String.prototype.padStart()`
- `Object.getOwnPropertyDescriptors`
- Trailing commas in function parameter lists and calls
- Async functions

### What is ESNext then?

ESNext is a dynamic name that refers to whatever the current version of ECMAScript is at the given time. For example, at the time of this writing `ES2017` or `ES8` is the current `ESNext`.

### What does the future hold?

Since the release of ES6, [TC39](https://github.com/tc39) has quite streamlined their process. TC39 operates through a Github organization now and there are [several proposals](https://github.com/tc39/proposals) for new features or syntax to be added to the next versions of ECMAScript. Any one can go ahead and [submit a proposal](https://github.com/tc39/proposals) thus resulting in increasing the participation from the community. Every proposal goes through [four stages of maturity](https://tc39.github.io/process-document/) before it makes it into the specification.

And that about wraps it up. Feel free to leave your feedback in the [discord](https://roadmap.sh/discord). Also here are the links to original language specifications [ES6](https://www.ecma-international.org/ecma-262/6.0/), [ES7](https://www.ecma-international.org/ecma-262/7.0/) and [ES8](https://www.ecma-international.org/ecma-262/8.0/).
