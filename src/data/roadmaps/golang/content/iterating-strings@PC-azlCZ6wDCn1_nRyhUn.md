# Iterating Strings

Iterate over strings with `for range` to get runes (Unicode code points) not bytes. Returns index and rune value. Direct indexing `str[i]` gives bytes. Use `[]rune(str)` to convert to rune slice for random access. Important for Unicode handling.