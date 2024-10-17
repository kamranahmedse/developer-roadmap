# ✨ Contribution Guidelines ✨

First of all, thank you for considering to contribute. Please look at the details below:

- [Hacktoberfest Contributions](#hacktoberfest-contributions)
- [New Roadmaps](#new-roadmaps)
- [Existing Roadmaps](#existing-roadmaps)
- [Adding Projects](#adding-projects)
- [Adding Content](#adding-content)
- [Guidelines](#guidelines)
- [Good vs. Not So Good Contributions](#good-vs-not-so-good-contributions)

## Hacktoberfest Contributions

We are taking part in [Hacktoberfest 11](https://hacktoberfest.com/)!

Before you start to contribute to our project in order to satisfy [Hacktoberfest requirements](https://hacktoberfest.com/participation/#contributors), please bare in mind the following:

- There is *not* a Hacktoberfest t-shirt this year [(see their FAQ)](https://hacktoberfest.com/participation/#faq)
- There is *not* an infinite opportunity to contribute to the roadmap.sh project.

### Hacktoberfest Specific Contribution Rules

As Hacktoberfest attracts a lot of contributors (which is awesome), it does require a more rigid and strictly enforced set of guidelines than the average contribution.

These are as follows:

1. No single file contributions, please contribute to a minimum of two.

Whilst single file contributions, such as adding one link to a single topic, is perfectly fine outside of hacktoberfest, this can (and probably will) result it an easy 4 pull requests for everyone and we will just become a Hacktoberfest farming project.

***Note: If you contribute the entire contents of a topic i.e. the topic has 0 copy and 0 links, this will count.***

2. Typo fixes will not count (by themselves).

Whilst fixing typos is a great thing to do, lets bundle them in with actual contributions if we see them!

3. The same basic rules apply.

- Content must be in English.
- Maximum of 8 links per topic.
- Follow the below style guide for content.

Here is an example of a **fully complete** topic:

```markdown
# Redis

Redis is an open-source, in-memory data structure store known for its speed and versatility. It supports various data types, including strings, lists, sets, hashes, and sorted sets, and provides functionalities such as caching, session management, real-time analytics, and message brokering. Redis operates as a key-value store, allowing for rapid read and write operations, and is often used to enhance performance and scalability in applications. It supports persistence options to save data to disk, replication for high availability, and clustering for horizontal scaling. Redis is widely used for scenarios requiring low-latency access to data and high-throughput performance.

Learn more from the following resources:

[@official@Link 1](https:/google.com)
[@article@Link 2](https:/google.com)
[@article@Link 3](https:/google.com)
[@course@Link 4](https:/google.com)
[@course@Link 5](https:/google.com)
[@video@Link 6](https:/google.com)
[@video@Link 7](https:/google.com)
[@video@Link 8](https:/google.com)
```

Contributions to the project that meet these requirements will be given the label `hacktoberfest-accepted` and merged, contributions that do not meet the requirements will simply be closed.

Any attempts at spam PRs will be given the `spam` tag. If you receive 2 `spam` tags against you, you will be [disqualified from Hacktoberfest](https://hacktoberfest.com/participation/#spam).

## New Roadmaps

For new roadmaps, you can either:

- Submit a roadmap by providing [a textual roadmap similar to this roadmap](https://gist.github.com/kamranahmedse/98758d2c73799b3a6ce17385e4c548a5) in an [issue](https://github.com/kamranahmedse/developer-roadmap/issues).
- Create an interactive roadmap yourself using [our roadmap editor](https://draw.roadmap.sh/) & submit the link to that roadmap in an [issue](https://github.com/kamranahmedse/developer-roadmap/issues).

## Existing Roadmaps

For the existing roadmaps, please follow the details listed for the nature of contribution:

- **Fixing Typos** — Make your changes in the [roadmap markdown file](https://github.com/kamranahmedse/developer-roadmap/tree/master/src/data/roadmaps) and submit a [PR](https://github.com/kamranahmedse/developer-roadmap/pulls).
- **Adding or Removing Nodes** — Please open an [issue](https://github.com/kamranahmedse/developer-roadmap/issues) with your suggestion.

**Note:** Please note that our goal is **not to have the biggest list of items**. Our goal is to list items or skills most relevant today.

## Adding Projects

If you have a project idea that you think we should add to the roadmap, feel free to open an issue with as many details about the project as possible and the roadmap you think it should be added to.

The detailed format for the issue should be as follows:

```md
## What is this project about?

(Add an introduction to the project.)

## Skills this Project Covers

(Comma separated list of skills, e.g. Programming Knowledge, Database, etc.)

## Requirements

( Detailed list of requirements, i.e. input, output, hints to help build this, etc.)
```

Have a look at this project to get an idea of [what we are looking for](https://roadmap.sh/projects/github-user-activity).

## Adding Content

Find [the content directory inside the relevant roadmap](https://github.com/kamranahmedse/developer-roadmap/tree/master/src/data/roadmaps). Please keep the following guidelines in mind when submitting content:

- Content must be in English.
- Maximum of 8 links per topic.
- Follow the below style guide for content.

### How To Structure Content

Please adhere to the following style when adding content to a topic:

```md
# Topic Title

(Content)

Visit the following resources to learn more:

- [@type@Title/Description of Link](Link)
```

`@type@` must be one of the following and describe the type of content you are adding:

- `@official@`
- `@opensource@`
- `@article@`
- `@course@`
- `@podcast@`
- `@video@`

It's important to add a valid type, this will help us categorize the content and display it properly on the roadmap. The order of the links based on type is same as above.

## Guidelines

- <p><strong>Please don't use the project for self-promotion!</strong><br/>

  We believe this project is a valuable asset to the developer community, and it includes numerous helpful resources. We kindly ask you to avoid submitting pull requests for the sole purpose of self-promotion. We appreciate contributions that genuinely add value, such as guides from maintainers of well-known frameworks, and will consider accepting these even if they're self authored. Thank you for your understanding and cooperation!

- <p><strong>Adding everything available out there is not the goal!</strong><br/>

  The roadmaps represent the skillset most valuable today, i.e., if you were to enter any of the listed fields today, what would you learn? There might be things that are of-course being used today, but prioritize the things that are most in demand today, e.g., agree that lots of people are using angular.js today, but you wouldn't want to learn that instead of React, Angular, or Vue. Use your critical thinking to filter out non-essential stuff. Give honest arguments for why the resource should be included.</p>

- <p><strong>Do not add things you have not evaluated personally!</strong><br/>

  Use your critical thinking to filter out non-essential stuff. Give honest arguments for why the resource should be included. Have you read this book? Can you give a short article?</p>

- <p><strong>Create a Single PR for Content Additions</strong></p>

  If you are planning to contribute by adding content to the roadmaps, I recommend you to clone the repository, add content to the [content directory of the roadmap](./src/data/roadmaps/) and create a single PR to make it easier for me to review and merge the PR.

- <p><strong>Write meaningful commit messages</strong><br/>

  Meaningful commit messages help speed up the review process as well as help other contributors gain a good overview of the repositories commit history without having to dive into every commit.

  </p>
- <p><strong>Look at the existing issues/pull requests before opening new ones</strong></p>

## Good vs. Not So Good Contributions

<strong>Good</strong>

- New Roadmaps.
- Engaging and fresh content links.
- Typos and grammatical fixes.
- Enhanced Existing Content.
- Content copy in topics that do not have any (or minimal copy exists).

<strong>Not So Good</strong>

- Adding whitespace that doesn't add to the readability of the content.
- Rewriting content in a way that doesn't add any value.
- Non-English content.
- PR's that don't follow our style guide, have no description, and a default title.
- Links to your own blog articles.

***

Have a look at the [License](./license) file.
