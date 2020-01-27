# Submitting a new roadmap

First of all thank you for considering to contribute to this project. It wouldn't have been possible for us to keep it live without your contributions 🙏

> This process will be automated soon. Follow the steps listed below in order to add a new roadmap for now
  
* Fork this repository
* If you haven't contributed to this project before then create your author profile
  * Open the file [authors.json](../content/authors.json)
  * Put your preferred `username`
  * Put a profile picture in [authors directory](../public/authors) with the username  
* Create a new directory for the roadmap inside the [roadmaps directory](../content/roadmaps) by following the below steps:
  * Directory name must be `kebab-cased` and prefixed with the incremental number e.g. `6-java-developer`
  * Create a markdown file `6-roadmap-name/0-About/0-Summary.md` inside this directory and write the article detailing the steps required for this path. It doesn't have to be graphic like the other roadmaps; just focus on writing a detailed but approachable textual guide. 
  * Create a file `meta.json` inside the roadmap directory with the content below:
  ```json
  {
    "title": "Roadmap Name",
    "description": "Step by step guide to becoming a modern ***",
    "featuredDescription": "Step by step guide to becoming a modern ** in 2020",
    "author": {
      "name": "Your Name",
      "url": "https://twitter.com/twitter"
    },
    "featured": false,
    "detailed": false,
    "versions": []
  }
  ```
* Once done, run the below command:
  ```shell
  yarn meta:roadmaps
  ```
* Commit, push and open a pull request 
