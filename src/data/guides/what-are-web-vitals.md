---
title: 'What are Web Vitals?'
description: 'Learn what are the core web vitals and how to measure them.'
author:
  name: 'Kamran Ahmed'
  url: 'https://twitter.com/kamrify'
  imageUrl: '/authors/kamranahmedse.jpeg'
seo:
  title: 'What are Web Vitals? - roadmap.sh'
  description: 'Learn what are the core web vitals and how to measure them.'
isNew: false
type: 'visual'
date: 2021-09-05
sitemap:
  priority: 0.7
  changefreq: 'weekly'
tags:
  - 'guide'
  - 'visual-guide'
  - 'guide-sitemap'
---

Web Vitals are a set of metrics proposed by Google to measure the quality of user experience on the web. These metrics provide insights into various aspects of website performance and help developers and website owners understand how well their sites are performing for users. The goal of Web Vitals is to improve the overall quality of web pages and create a better browsing experience for visitors.

There are three core Web Vitals metrics:

* LCP (measures **loading time**)
* FID (measures **interactivity**)
* CLS (measures **visual stability**)

## LCP (Largest Contentful Paint)

Refers to the render time of the largest image or text block

> Time that browser takes to render the element having largest height in the visible viewport of the webpage (e.g., some big chunk of text or large slider image in the hero section).

|  Good  | Average | Poor |
|  ----  | ------- | ---- |
| < 2.5s |   < 4s  | > 4s |

## FID (First Input Delay)

Refers to the time it takes for browser to respond to user's first interaction

> There might be a delay in browser performing user's action upon user's interaction because the main thread might be busy parsing and executing some large JavaScript

|  Good  | Average | Poor |
|  ----  | ------- | ---- |
| < 100ms |   < 300ms  | > 300ms |

## CLS (Cumulative Layout Shift)

Refers to the unexpected layout shifts while user is browsing

> The flicker or sudden changes on the webpage (e.g., due to asynchronous loading of the content, loading of an image or video with unknown dimensions).

|  Good  | Average | Poor |
|  ----  | ------- | ---- |
| < 0.1 |   < 0.25  | > 0.25 |


## How to measure Web Vitals

There are three main ways to measure Web Vitals:

* use the npm package called ```web-vitals```
* use the Google Chrome **Web Vitals** extension
* use the **Lighthouse** tool in the Google Chrome DevTools 

