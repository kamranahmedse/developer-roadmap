# go:embed for embedding

The `go:embed` directive embeds files and directories into Go binaries at compile time using `//go:embed` comments. Useful for including static assets, configs, and templates directly in executables, creating self-contained binaries that don't require external files.