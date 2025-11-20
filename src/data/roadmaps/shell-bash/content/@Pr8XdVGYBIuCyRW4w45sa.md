# Square Bracket Wildcards in Shell/Bash

Square brackets `[]` in shell wildcards define a character class, matching any single character *within* the brackets. This allows you to specify a range or set of characters to match in a filename or string. For example, `[abc]` will match either 'a', 'b', or 'c'. You can also use ranges like `[a-z]` to match any lowercase letter or `[0-9]` to match any digit. A caret `^` inside the brackets negates the character class, matching any character *not* listed (e.g., `[^0-9]` matches anything that isn't a digit).

Visit the following resources to learn more:

- [@article@Standard Wildcards / Globbing Patterns in Linux](https://www.putorius.net/standard-wildcards-globbing-patterns-in.html)
- [@video@wildcards in linux | asterisk , question mark , square brackets , curly brackets , escape character](https://www.youtube.com/watch?v=_J9JwnIzJ9o)