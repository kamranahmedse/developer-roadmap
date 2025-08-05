# Plugins & Dynamic Loading

Go's plugin system allows loading shared libraries (.so files) at runtime using the `plugin` package. Built with `go build -buildmode=plugin`. Enables modular architectures but has limitations: Unix-only, version compatibility issues, and complexity.

Visit the following resources to learn more:

- [@official@plugin package](https://pkg.go.dev/plugin)
- [@article@Plugins with Go How to use Go's standard](https://medium.com/profusion-engineering/plugins-with-go-7ea1e7a280d3)
- [@article@Plugin in Golang](https://dev.to/jacktt/plugin-in-golang-4m67)