# $and

The $and operator in MongoDB performs logical AND operation on multiple query expressions, returning documents that satisfy all specified conditions. It accepts an array of query expressions and is implicitly used when multiple conditions are provided at the same level. $and is explicit when combining complex expressions or when the same field needs multiple conditions.