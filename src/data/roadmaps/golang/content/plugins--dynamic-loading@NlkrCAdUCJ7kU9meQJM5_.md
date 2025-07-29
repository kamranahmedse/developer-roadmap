# Plugins & Dynamic Loading

Go's plugin system allows loading shared libraries (.so files) at runtime using the `plugin` package. Built with `go build -buildmode=plugin`. Enables modular architectures but has limitations: Unix-only, version compatibility issues, and complexity.