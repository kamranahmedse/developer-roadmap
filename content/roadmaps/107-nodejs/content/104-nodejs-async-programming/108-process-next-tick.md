# Process next tick

process.nextTick(): Everytime the event loop takes a full trip, we call it a TICK.

When we pass a function to process.nextTick(), we instruct the engine to invoke this function at the end of the current operation, before the next eventloop tick starts.

<BadgeLink colorScheme='blue' badgeText='Official Website' href=https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/'>The Node.js process.nextTick()</BadgeLink>
                                                                                                                                  
<BadgeLink badgeText='Watch' href='https://www.youtube.com/watch?v=-niA5XOlCWI'>The process.nextTick Function</BadgeLink>

<BadgeLink colorScheme='yellow' badgeText='Read' href='https://nodejs.dev/en/learn/understanding-processnexttick/'>Understanding Process.NextTick()</BadgeLink>
                                                                                                                                  
                                                                                                                                  
