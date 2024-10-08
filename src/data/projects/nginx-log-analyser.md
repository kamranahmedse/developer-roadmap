---
title: 'Nginx Log Analyser'
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
  title: 'Nginx Log Analyser'
  description: 'Build a simple CLI tool to analyze logs from the command line.'
  keywords:
    - 'Nginx Log Analyser'
    - 'devops project idea'
roadmapIds:
  - 'devops'
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

1. Top 5 IP addresses with the most requests
2. Top 5 most requested paths
3. Top 5 response status codes
4. Top 5 user agents

Here is an example of what the output should look like:

```text
Top 5 IP addresses with the most requests:
45.76.135.253 - 1000 requests
142.93.143.8 - 600 requests
178.128.94.113 - 50 requests
43.224.43.187 - 30 requests
178.128.94.113 - 20 requests

Top 5 most requested paths:
/api/v1/users - 1000 requests
/api/v1/products - 600 requests
/api/v1/orders - 50 requests
/api/v1/payments - 30 requests
/api/v1/reviews - 20 requests

Top 5 response status codes:
200 - 1000 requests
404 - 600 requests
500 - 50 requests
401 - 30 requests
304 - 20 requests
```

There are multiple ways to solve this challenge. Do some research on `awk`, `sort`, `uniq`, `head`, `grep`, and `sed` commands. Stretch goal is to come up with multiple solutions for the above problem. For example, instead of using `awk`, you can use `grep` and `sed` to filter and count the requests.
