# Binary vs Text Mode

Text mode may translate certain characters, most notably line endings, when reading or writing a file, converting between the operating system's native line-ending convention and a consistent internal representation. Binary mode performs no such translation, transferring bytes exactly as they are stored. On Unix-like systems the two modes behave identically, but on Windows the distinction matters, since text mode translates between `\n` and `\r\n`.

Visit the following resources to learn more:

- [@article@C File Handling](https://www.programiz.com/c-programming/c-file-input-output)
- [@video@Binary File Access Introduction | C Programming Example](https://www.youtube.com/watch?v=UtckqNKZFrA)