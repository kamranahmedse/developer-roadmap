# Configuration Endpoints

> Use the configuration endpoints, instead of individual node endpoints.

Normally you would have to make your application aware of every Memcached node available. If you want to dynamically scale up your capacity, then this becomes an issue as you will need to have some way to make your application aware of the changes. An easier way is to use the configuration endpoint, which means using an AWS version of a Memcached library that abstracts away the auto-discovery of new nodes. The [AWS guide to cache node auto-discovery](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/WhatIs.html) has more information.
