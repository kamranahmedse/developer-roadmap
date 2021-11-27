## Scripts

Here is the list of scripts available:

- [Sitemap](#sitemap)
- [Roadmaps Meta](#roadmaps-meta)
- [Content Skeleton](#content-skeleton)

## Sitemap

Generates the sitemap with all the pages and guides

```shell
npm run meta:sitemap
```

## Roadmaps Meta

Generates the `content/roadmaps.json` file by combining the `content/raodmaps/**/meta.json` content in each roadmap

```shell
npm run meta:roadmaps
```

## Content Skeleton

This command is used to create the content folders and files for the interactivity of the roadmap. You can use the below command to generate the roadmap skeletons inside a roadmap directory:

```shell
npm run roadmap-content [frontend|backend|devops|...]
```

For the content skeleton to be generated, we should have proper grouping, and the group names in the project files. You can follow the steps listed below in order to add the meta information to the roadmap. 

* Remove all the groups from the roadmaps through the project editor. Select all and press <kbd>cmd</kbd>+<kbd>shift</kbd>+<kbd>g</kbd>
* Identify the boxes that should be clickable and group them together <kbd>cmd</kbd>+<kbd>shift</kbd>+<kbd>g</kbd>
* Assign the name to the groups. 
  * Group names have the format of `[sort]-[slug]` e.g. `100-internet`. Each group name should start with a number starting from `100` which helps with sorting of the directories and the files. Groups at the same level have the sequential sorting information.
  * Each groups children have a separate group and have the name similar to `[sort]-[parent-slug]:[child-slug]` where `sort` refers to the sorting of the `child-slug` and not the parent. Also `parent-slug` does not need to have the sorting information as a part of slug e.g. if parent was `100-internet` the children would be `100-internet:how-does-the-internet-work`, `101-internet:what-is-http`, `102-internet:browsers`.
