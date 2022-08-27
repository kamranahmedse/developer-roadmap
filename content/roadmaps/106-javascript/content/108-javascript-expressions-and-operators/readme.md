# Expressions and Operators

At a high level, an expression is a valid unit of code that resolves to a value. There are two types of expressions: those that have side effects (such as assigning values) and those that purely evaluate. The expression `x = 7` is an example of the first type. This expression uses the `=` operator to assign the value seven to the variable x. The expression itself evaluates to 7. The expression `3 + 4` is an example of the second type. This expression uses the `+` operator to add `3` and `4` together and produces a value, `7`. However, if it's not eventually part of a bigger construct (for example, a variable declaration like const `z = 3 + 4`), its result will be immediately discarded `—` this is usually a programmer mistake because the evaluation doesn't produce any effects. As the examples above also illustrate, all complex expressions are joined by operators, such as `=` and `+`.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='blue' badgeText='Read' href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators'>Expressions and operators</BadgeLink>
