# Cross-compilation

Build executables for different OS and architectures using `GOOS` and `GOARCH` environment variables. Example: `GOOS=linux GOARCH=amd64 go build` creates Linux binaries. Enables multi-platform development without separate build environments.