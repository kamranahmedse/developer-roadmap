# Twirp

Twirp is a framework for service-to-service communication emphasizing simplicity and minimalism. It generates routing and serialization from API definition files and lets you focus on your application's logic instead of thinking about folderol like HTTP methods and paths and JSON.

Twirp is similar to gRPC, but without the custom HTTP server and transport implementations: it runs on the standard library's extremely-well-tested-and-high-performance net/http Server. It can run on HTTP 1.1, not just http/2, and supports JSON serialization for easy debugging.

Visit the following resources to learn more:

- [@opensource@GitHub Repository](https://github.com/twitchtv/twirp)
- [@article@Getting started](https://twitchtv.github.io/twirp/docs/intro.html)
