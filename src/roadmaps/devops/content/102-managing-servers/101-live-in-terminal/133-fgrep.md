# fgrep

`fgrep` (**F**ixed **Grep**) command is used for searching fixed-character strings in a file.
It treats meta-characters or regular expressions in the search field as strings. For searching any **direct string** or files having meta-characters, this is the version of grep which should be selected. It works the same way as `$ grep -F` command.

It has the following syntax:

`$  fgrep [options] [string] [files]` e.g. `$ fgrep "search-string" file.txt`

{% resources %}
  {% Blog "https://www.geeksforgeeks.org/fgrep-command-in-linux-with-examples/", "Fgrep command with examples" %}
  {% Blog "https://www.thegeekdiary.com/fgrep-command-examples-in-linux/", "options" %}
  {% Blog "https://www.tecmint.com/difference-between-grep-egrep-and-fgrep-in-linux/", "Grep vs Egrep vs Fgrep" %}
{% endresources %}