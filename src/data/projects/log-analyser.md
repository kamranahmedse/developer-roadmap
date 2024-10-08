---
title: 'Log Analysis Tool'
description: 'Write a simple tool to analyze logs from the command line.'
isNew: true
sort: 3
difficulty: 'beginner'
nature: 'CLI'
skills:
  - 'linux'
  - 'bash'
  - 'shell scripting'
seo:
  title: 'Log Analysis Tool'
  description: 'Build a simple CLI tool to analyze logs from the command line.'
  keywords:
    - 'log analysis tool'
    - 'devops project idea'
roadmapIds:
  - 'devops'
  - 'linux'
---

The goal of this project is to help you practice some basic shell scripting skills. You will write a simple tool to analyze logs from the command line.

## Requirements

Download the sample nginx access log file from [here](https://gist.githubusercontent.com/kamranahmedse/e66c3b9ea89a1a030d3b739eeeef22d0/raw/77fb3ac837a73c4f0206e78a236d885590b7ae35/nginx-access.log). The log file contains the following fields:

- IP address
- Date and time
- Request method and path
- Response status code
- Response size
- Referrer
- User agent

You are required to create a shell script that reads the log file and provides the following information:

```text
Top 5 IP addresses with the most requests:
45.76.135.253 - 1000 requests
142.93.143.8 - 600 requests
178.128.94.113 - 50 requests
43.224.43.187 - 30 requests
178.128.94.113 - 20 requests


```
