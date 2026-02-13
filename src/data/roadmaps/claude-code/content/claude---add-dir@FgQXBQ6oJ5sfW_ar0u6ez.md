# claude --add-dir

The `claude --add-dir` command is a startup flag that allows you to include extra folders in your working session before the interface even opens. By providing one or more directory paths when you launch the tool (for example, `claude --add-dir ../library --add-dir ./docs`), you grant the assistant permission to read and modify files in those external locations alongside your current project. This is particularly useful for cross-repository tasks, such as updating a shared library and its dependent application simultaneously, as it ensures the AI has a unified view of all relevant codebases from the very first prompt.

Visit the following resources to learn more:

- [@official@CLI flags](https://code.claude.com/docs/en/cli-reference#cli-flags)
- [@official@Load memory from additional directories](https://code.claude.com/docs/en/memory#load-memory-from-additional-directories)
