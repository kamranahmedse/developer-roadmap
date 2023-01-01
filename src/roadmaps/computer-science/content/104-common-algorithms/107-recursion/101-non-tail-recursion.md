# Non-tail recursion

Tail recursion is when a function can directly return the result of a recursive call - there are no outstanding operations, and there is no need for the call stack frame to be preserved. So it can be translated to a “goto with arguments”, and the stack usage will be constant.

In “non-tail recursion”, there are outstanding operations after the recursive call, and the stack frame cannot be nuked.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.quora.com/What-is-non-tail-recursion'>What is non-tail recursion?</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.baeldung.com/cs/tail-vs-non-tail-recursion'>Tail vs Non-Tail Recursion</BadgeLink>
<BadgeLink colorScheme='red' badgeText='Watch' href='https://www.youtube.com/watch?v=IVLUGb_gDDE'>Recursion (Solved Problem 1)</BadgeLink>
<BadgeLink colorScheme='red' badgeText='Watch' href='https://www.youtube.com/watch?v=HIt_GPuD7wk'>Types of Recursion (Part 2) | Tail & Non-tail Recursion</BadgeLink>
