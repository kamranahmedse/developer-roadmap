## CLI Tools
> A bunch of CLI scripts to make the development easier

## `roadmap-links.cjs`

Generates a list of all the resources links in any roadmap file.

## `compress-jsons.cjs`

Compresses all the JSON files in the `public/jsons` folder

## `update-sponsors.cjs`

Updates the sponsor ads on each roadmap page with the latest sponsor information in the Excel sheet.

## `roadmap-content.cjs`

Currently, for any new roadmaps that we add, we do create the interactive roadmap but we end up leaving the content empty in the roadmap till we get time to fill it up manually.

This script populates all the content files with some minimal content from OpenAI so that the users visiting the website have something to read in the interactive roadmap till we get time to fill it up manually.

## `roadmap-dirs.cjs`

This command is used to create the content folders and files for the interactivity of the roadmap. You can use the below command to generate the roadmap skeletons inside a roadmap directory:

```bash
npm run roadmap-dirs [frontend|backend|devops|...]
```

For the content skeleton to be generated, we should have proper grouping, and the group names in the project files. You can follow the steps listed below in order to add the meta information to the roadmap.

- Remove all the groups from the roadmaps through the project editor. Select all and press `cmd+shift+g`
- Identify the boxes that should be clickable and group them together with `cmd+shift+g`
- Assign the name to the groups.
  - Group names have the format of `[sort]-[slug]` e.g. `100-internet`. Each group name should start with a number starting from 100 which helps with sorting of the directories and the files. Groups at the same level have the sequential sorting information.
  - Each groups children have a separate group and have the name similar to `[sort]-[parent-slug]:[child-slug]` where sort refers to the sorting of the `child-slug` and not the parent. Also parent-slug does not need to have the sorting information as a part of slug e.g. if parent was `100-internet` the children would be `100-internet:how-does-the-internet-work`, `101-internet:what-is-http`, `102-internet:browsers`.


