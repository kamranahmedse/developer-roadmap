# Contribution

First of all thank you for considering to contribute. Please look at the details below:

- [New Roadmaps](#new-roadmaps)
- [Existing Roadmaps](#existing-roadmaps)
- [Adding Projects](#adding-projects)
- [Adding Content](#adding-content)
- [Guidelines](#guidelines)

## New Roadmaps

For new roadmaps, you can either:
- Submit a roadmap by providing [a textual roadmap similar to this roadmap](https://gist.github.com/kamranahmedse/98758d2c73799b3a6ce17385e4c548a5) in an [issue](https://github.com/kamranahmedse/developer-roadmap/issues).
- Create an interactive roadmap yourself using [our roadmap editor](https://draw.roadmap.sh/) & submit the link to that roadmap in an [issue](https://github.com/kamranahmedse/developer-roadmap/issues).

## Existing Roadmaps

For the existing roadmaps, please follow the details listed for the nature of contribution:

- **Fixing Typos** — Make your changes in the [roadmap JSON file](https://github.com/kamranahmedse/developer-roadmap/tree/master/src/data/roadmaps) and submit a [PR](https://github.com/kamranahmedse/developer-roadmap/pulls).
- **Adding or Removing Nodes** — Please open an [issue](https://github.com/kamranahmedse/developer-roadmap/issues) with your suggestion.

**Note:** Please note that our goal is <strong>not to have the biggest list of items</strong>. Our goal is to list items or skills most relevant today.

## Adding Projects

If you have a project idea that you think we should add to the roadmap, feel free to open an issue with as much details about the project as possible and the roadmap you think it should be added to.

## Adding Content

Find [the content directory inside the relevant roadmap](https://github.com/kamranahmedse/developer-roadmap/tree/master/src/data/roadmaps). Please keep the following guidelines in mind when submitting content:

- Content must be in English.
- Maximum of 8 links per topic.
- Follow the below style guide for content.

### How To Structure Content

Please adhere to the following style when adding content to a topic:

```
# Topic Title

(Content)

Visit the following resources to learn more:

- [@type@Description of link](Link)
```

`@type@` must be one of the following and describes the type of content you are adding:

- `@official@`
- `@opensource@`
- `@article@`
- `@course@`
- `@podcast@`
- `@video@`

It's important to add a valid type, this will help us categorize the content and display it properly on the roadmap.

## Guidelines

- <p><strong>Please don't use the project for self-promotion!</strong><br />

  We believe this project is a valuable asset to the developer community and it includes numerous helpful resources. We kindly ask you to avoid submitting pull requests for the sole purpose of self-promotion. We appreciate contributions that genuinely add value, such as guides from maintainers of well-known frameworks, and will consider accepting these even if they're self authored. Thank you for your understanding and cooperation!

- <p><strong>Adding everything available out there is not the goal!</strong><br />

  The roadmaps represent the skillset most valuable today, i.e., if you were to enter any of the listed fields today, what would you learn? There might be things that are of-course being used today but prioritize the things that are most in demand today, e.g., agreed that lots of people are using angular.js today but you wouldn't want to learn that instead of React, Angular, or Vue. Use your critical thinking to filter out non-essential stuff. Give honest arguments for why the resource should be included.</p>

- <p><strong>Do not add things you have not evaluated personally!</strong><br />

  Use your critical thinking to filter out non-essential stuff. Give honest arguments for why the resource should be included. Have you read this book? Can you give a short article?</p>

- <p><strong>Create a Single PR for Content Additions</strong></p>

  If you are planning to contribute by adding content to the roadmaps, I recommend you to clone the repository, add content to the [content directory of the roadmap](./src/data/roadmaps/) and create a single PR to make it easier for me to review and merge the PR.

- <p><strong>Write meaningful commit messages</strong><br >

  Meaningful commit messages help speed up the review process as well as help other contributors in gaining a good overview of the repositories commit history without having to dive into every commit.

  </p>
- <p><strong>Look at the existing issues/pull requests before opening new ones</strong></p>

### Good vs Not So Good Contributions

<strong>Good</strong>

  - New Roadmaps.
  - Engaging, fresh content links.
  - Typos and grammatical fixes.
  - Content copy in topics that do not have any (or minimal copy exists).

<strong>Not So Good</strong>

  - Adding whitespace that doesn't add to the readability of the content.
  - Rewriting content in a way that doesn't add any value.
  - Non-English content.
  - PR's that don't follow our style guide, have no description and a default title.
  - Links to your own blog articles.
