# Comma-Ok Idiom

Pattern for safely testing map key existence or type assertion success using `value, ok := map[key]` or `value, ok := interface.(Type)`. Returns both value and boolean status, preventing panics and distinguishing zero values from missing keys.

Visit the following resources to learn more:

- [@article@The Comma Ok Idiom](https://dev.to/saurabh975/comma-ok-in-go-l4f)
- [@article@How the Comma Ok Idiom and Package System Work in Go](https://www.freecodecamp.org/news/how-the-comma-ok-idiom-and-package-system-work-in-go/)
- [@article@Statement Idioms in Go](https://medium.com/@nateogbonna/statement-idioms-in-go-writing-clean-idiomatic-go-code-6fe92e6e8ab4)
