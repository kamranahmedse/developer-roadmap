# Contribution guidelines

## Pull Request Checklist

First of all, thank you for considering to contribute. 

Before sending your pull requests, make sure you do the following:

- [Contributing Guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Contributor License Agreement (CLA)](https://cla.developers.google.com/)
- [New Roadmaps](#new-roadmaps)
- [Existing Roadmaps](#existing-roadmaps)
- [Adding Projects](#adding-projects)
- [Adding Content](#adding-content)
- [Guidelines](#guidelines)

## How to become a contributor and submit your own code

![Screen Shot 2022-08-30 at 7 27 04 PM](https://user-images.githubusercontent.com/42785357/187579207-9924eb32-da31-47bb-99f9-d8bf1aa238ad.png)

### Typical Pull Request Workflow -

**1. New PR**

- As a contributor, you submit a New PR on GitHub.
- We inspect every incoming PR and add certain labels to the PR such as `size:`,
  `comp:` etc.  At this stage we check if the PR is valid and meets certain
  quality requirements. For example, we check if the CLA is signed, PR has
  sufficient description, if applicable unit tests are added, if it is a
  reasonable contribution (meaning it is not a single liner cosmetic PR).

**2. Valid?**

-   If the PR passes all the quality checks then we go ahead and assign a
    reviewer.
-   If the PR didn't meet the validation criteria, we request for additional
    changes to be made to PR to pass quality checks and send it back or on a
    rare occasion we may reject it.

**3. Review**

-   For a valid PR, reviewer (person familiar with the code/functionality)
    checks if the PR looks good or needs additional changes.
-   If all looks good, the reviewer will approve the PR.
-   If a change is needed, the contributor is requested to make the suggested
    change.
-   You make the change and submit it for the review again.
-   This cycle repeats itself until the PR gets approved.
-   Note: As a friendly reminder, we may reach out to you if the PR is awaiting
    your response for more than 2 weeks.

**4. Approved**

-   Once the PR is approved, it gets `kokoro:force-run` label applied and it
    initiates CI/CD tests.
-   We can't move forward if these tests fail.
-   In such situations, we may request you to make further changes to your PR
    for the tests to pass.
-   Once the tests pass, we now bring all the code into the internal code base,
    using a job called "copybara".

**5. Copy to Google Internal codebase and run internal CI**

-   Once the PR is in the Google codebase, we make sure it integrates well with
    its dependencies and the rest of the system.
-   Rarely, If the tests fail at this stage, we cannot merge the code.
-   If needed, we may come to you to make some changes. At times, it may not be
    you, it may be us who may have hit a snag. Please be patient while we work
    to fix this.
-   Once the internal tests pass, we go ahead and merge the code internally as
    well as externally on GitHub.

In a graphical form, the entire lifetime of a PR looks like

![image](https://github.com/tensorflow/tensorflow/assets/52792999/3eea4ca5-daa0-4570-b0b5-2a2b03a724a3)

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

If you have a project idea that you think we should add to the roadmap, feel free to open an issue with as many details about the project as possible and the roadmap you think it should be added to.

The detailed format for the issue should be as follows:

```
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

```
# Topic Title

(Content)

Visit the following resources to learn more:

- [@type@Description of link](Link)
```

`@type@` must be one of the following and describe the type of content you are adding:

- `@official@`
- `@opensource@`
- `@article@`
- `@course@`
- `@podcast@`
- `@video@`

It's important to add a valid type, this will help us categorize the content and display it properly on the roadmap.

## Guidelines

- <p><strong>Please don't use the project for self-promotion!</strong><br />

  We believe this project is a valuable asset to the developer community, and it includes numerous helpful resources. We kindly ask you to avoid submitting pull requests for the sole purpose of self-promotion. We appreciate contributions that genuinely add value, such as guides from maintainers of well-known frameworks, and will consider accepting these even if they're self authored. Thank you for your understanding and cooperation!

- <p><strong>Adding everything available out there is not the goal!</strong><br />

  The roadmaps represent the skillset most valuable today, i.e., if you were to enter any of the listed fields today, what would you learn? There might be things that are of-course being used today, but prioritize the things that are most in demand today, e.g., agree that lots of people are using angular.js today, but you wouldn't want to learn that instead of React, Angular, or Vue. Use your critical thinking to filter out non-essential stuff. Give honest arguments for why the resource should be included.</p>

- <p><strong>Do not add things you have not evaluated personally!</strong><br />

  Use your critical thinking to filter out non-essential stuff. Give honest arguments for why the resource should be included. Have you read this book? Can you give a short article?</p>

- <p><strong>Create a Single PR for Content Additions</strong></p>

  If you are planning to contribute by adding content to the roadmaps, I recommend you to clone the repository, add content to the [content directory of the roadmap](./src/data/roadmaps/) and create a single PR to make it easier for me to review and merge the PR.

- <p><strong>Write meaningful commit messages</strong><br >

  Meaningful commit messages help speed up the review process as well as help other contributors gain a good overview of the repositories commit history without having to dive into every commit.

  </p>
- <p><strong>Look at the existing issues/pull requests before opening new ones</strong></p>

### Good vs. Not So Good Contributions

<strong>Good</strong>

  - New Roadmaps.
  - Engaging, fresh content links.
  - Typos and grammatical fixes.
  - Content copy in topics that do not have any (or minimal copy exists).

<strong>Not So Good</strong>

  - Adding whitespace that doesn't add to the readability of the content.
  - Rewriting content in a way that doesn't add any value.
  - Non-English content.
  - PR's that don't follow our style guide, have no description, and a default title.
  - Links to your own blog articles.
