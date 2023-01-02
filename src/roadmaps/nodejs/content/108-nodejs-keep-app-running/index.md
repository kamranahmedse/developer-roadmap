# Keep App Running

In Node.js, you need to restart the process to make changes take effect. This adds an extra step to your workflow. You can eliminate this extra step by using `nodemon` to restart the process automatically.

Since Node.js 18.11.0, you can run Node with the `--watch` flag to reload your app everytime a file is changed. So you don't need to use `nodemon` anymore.
[Node.js 18.11.0 Changelog](https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V18.md#18.11.0).
