# Value Receivers

Methods receive copy of struct rather than pointer. Use `func (v Type) methodName()` syntax. Appropriate when method doesn't modify receiver or struct is small. Can be called on both values and pointers with Go automatically dereferencing.