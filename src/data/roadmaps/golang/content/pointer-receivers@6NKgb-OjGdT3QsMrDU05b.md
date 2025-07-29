# Pointer Receivers

Methods receive pointer to struct rather than copy using `func (p *Type) methodName()` syntax. Necessary when method modifies receiver state or struct is large. Go automatically handles value/pointer conversion when calling methods.