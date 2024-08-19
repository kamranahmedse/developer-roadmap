---
title: 'Log Archive Tool'
description: 'Build a tool to archive logs from the CLI.'
isNew: false
sort: 2
difficulty: 'beginner'
nature: 'CLI'
skills:
  - 'linux'
  - 'bash'
  - 'shell scripting'
seo:
  title: 'Log Archive Tool'
  description: 'Build a tool to archive logs from the CLI.'
  keywords:
    - 'log archive tool'
    - 'devops project idea'
roadmapIds:
  - 'devops'
  - 'linux'
---

In this project, you will build a tool to archive logs on a set schedule by compressing them and storing them in a new directory, this is especcially useful for removing old logs and keeping the system clean while maintaining the logs in a compressed format for future reference. This project will help you practice your programming skills, including working with files and directories, and building a simple cli tool.

The most common location for logs on a unix based system is `/var/log`.

## Requirements

The tool should run from the command line, accept the log directory as an argument, compress the logs, and store them in a new directory. The user should be able to:

- Provide the log directory as an argument when running the tool.
  ```bash
  log-archive <log-directory>
  ```
- The tool should compress the logs in a tar.gz file and store them in a new directory.
- The tool should log the date and time of the archive to a file.
  ```bash
  logs_archive_20240816_100648.tar.gz
  ```

You can learn more about the `tar` command [here](https://www.gnu.org/software/tar/manual/tar.html).

<hr />

If you are looking to build a more advanced version of this project, you can consider adding functionality to the tool like emailing the user updates on the archive, or sending the archive to a remote server or cloud storage.
