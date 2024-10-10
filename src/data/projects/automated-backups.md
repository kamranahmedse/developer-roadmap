---
title: 'Automated DB Backups'
description: 'Setup a scheduled workflow to backup a Database every 12 hours'
isNew: false
sort: 15
difficulty: 'intermediate'
nature: 'Backups'
skills:
  - 'bash'
  - 'devops'
seo:
  title: 'Automated DB Backups'
  description: 'Setup a scheduled workflow to backup a Database every 12 hours'
  keywords:
    - 'Backup'
    - 'Database'
    - 'MongoDB'
roadmapIds:
  - 'devops'
---

The goal of this project is to setup a scheduled workflow to backup a Database every 12 hours and upload the backup to [Clouodflare R2](https://developers.cloudflare.com/r2/) which has a free tier for storage.

## Requirements

The pre-requisite for this project is to have a server setup and a database ready to backup. You can use one of the projects did in [the other project](/projects/multi-container-service). Alternatively:

- Setup a server on [Digital Ocean](https://m.do.co/c/b29aa8845df8) or any other provider
- Run a MongoDB instance on the server
- Seed some data to the database

Once you have a server and a database ready, you can proceed to the next step.

### Scheduled Backups

You can do this bit either by setting up a cron job on the server or alternatively setup a [scheduled workflow in Github Actions](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#schedule) that runs every 12 hours and execute the backup from there. Database should be backedup up into a tarball and uploaded to [Clouodflare R2](https://developers.cloudflare.com/r2/).

Hint: You can use the `mongodump` to dump the database and then use `aws cli` to upload the file to R2.

### Stretch Goal

Write a script to download the latest backup from R2 and restore the database.

<hr />

Database backups are essential to ensure that you can restore your data in case of a disaster. This project will give you hands on experience on how to setup a scheduled workflow to backup a database and how to restore it from a backup.