# Set immediate

The `setImmediate` function delays the execution of a function to be called after the current event loops finishes all its execution. It's very simmilar to calling `setTimeout` with 0 ms of delay.

It works like this:

`setImmediate(func, param0, param1, /* … ,*/ paramN)`

Where:

-`func` is the function to be delayed
-`param0, param1, ..., paramN` are the parameters the `func` function receives

<ResourceGroupTitle>Free Content</ResourceGroupTitle>

<BadgeLink colorScheme='yellow' badgeText='Read' href='https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate'>Understanding setImmediate</BadgeLink>
