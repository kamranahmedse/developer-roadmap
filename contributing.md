# Contribution

First of all thank you for considering to contribute. Please look at the details below:

* [New Roadmaps](#new-roadmaps)
* [Existing Roadmaps](#existing-roadmaps)
* [Adding Content](#adding-content)
* [Guidelines](#guidelines)

## New Roadmaps

For new roadmaps, submit a roadmap by providing [a textual roadmap similar to this roadmap](https://gist.github.com/kamranahmedse/98758d2c73799b3a6ce17385e4c548a5) in an issue.

## Existing Roadmaps

For the existing roadmaps, please follow the details listed for the nature of contribution:

* **Fixing Typos** — Make your changes in the [roadmap JSON file](https://github.com/kamranahmedse/developer-roadmap/tree/master/public/project)
* **Adding or Removing Nodes** — Please open an issue with your suggestion. 

**Note:** Please note that our goal is not to have the biggest list of items. Our goal is to list items or skills most relevant today.

## Adding Content

Adding Content to Nodes — Add your content in [the content directory inside the relevant roadmap](https://github.com/kamranahmedse/developer-roadmap/tree/master/content/roadmaps).

Please note that the markdown has a specific format. Please follow the sample format for markdown as given here.

* Title of the file to represent the node item.
* Add a brief summary describing the roadmap node (preferably less than 200 characters)
* Use `ResourceGroupTitle` tag for the resources heading
  ```
  <ResourceGroupTitle>Free Content</ResourceGroupTitle>
  ```
* Use `BadgeLink` tag for the resource links with below guidelines
  ```html
  <!-- blue color scheme for the official websites and documentation -->
  <BadgeLink colorScheme='blue' badgeText='Official Website' href='https://reactjs.org/'>React Website</BadgeLink>
  
  <!-- green color scheme for the courses -->
  <BadgeLink badgeText='Course' colorScheme='green' href='https://example.com'>The Beginner's Guide to React</BadgeLink>
  
  <!-- no color scheme for the video links -->
  <BadgeLink badgeText='Watch' href='https://www.youtube.com/watch?v=i793Qm6kv3U'>Understanding React's UI Rendering Process</BadgeLink>
  
  <!-- yellow color scheme for the blog posts and readable text -->
  <BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.cloudflare.com/en-gb/learning/dns/what-is-dns/'>What is DNS?</BadgeLink>
  ```

## Guidelines

- <p><strong>Adding everything available out there is not the goal!</strong><br /> 
  The roadmaps represent the skillset most valuable today, i.e., if you were to enter any of the listed fields today, what would you learn?! There might be things that are of-course being used today but prioritize the things that are most in demand today, e.g., agreed that lots of people are using angular.js today but you wouldn't want to learn that instead of React, Angular, or Vue. Use your critical thinking to filter out non-essential stuff. Give honest arguments for why the resource should be included.</p>
- <p><strong>Do not add things you have not evaluated personally!</strong><br /> 
  Use your critical thinking to filter out non-essential stuff. Give honest arguments for why the resource should be included. Have you read this book? Can you give a short article?</p>
- <p><strong>One item per Pull Request</strong><br />
  There may be a discussion related to an item you want to add. Adding just a single item per pull request makes it much easier for everyone involved.</p>
- Write meaningful commit messages
- Look at the existing issues/pull requests before opening new ones
