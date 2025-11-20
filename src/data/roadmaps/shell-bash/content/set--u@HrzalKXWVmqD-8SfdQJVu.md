# set -u

The `set -u` command in shell scripting treats unset variables as an error. When this option is enabled, the script will exit immediately if it tries to use a variable that has not been assigned a value. This helps to catch potential bugs caused by typos or missing variable assignments, making scripts more robust.

Visit the following resources to learn more:

- [@article@set -e, -u, -o, -x pipefail explanation](https://gist.github.com/mohanpedala/1e2ff5661761d3abd0385e8223e16425)