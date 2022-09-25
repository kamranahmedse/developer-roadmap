# Event emitter

In Node.js an event can be described simply as a string with a corresponding callback. An event can be "emitted" (or in other words, the corresponding callback be called) multiple times or you can choose to only listen for the first time it is emitted.

`Event emitter` are objects in Node.js that trigger an event by sending a message to signal that an action was completed. JavaScript developers can write code that listens to events from an event emitter, allowing them to execute functions every time those events are triggered. In this context, events are composed of an identifying string and any data that needs to be passed to the listeners.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='blue' badgeText='Official Website' href='https://nodejs.org/en/knowledge/getting-started/control-flow/what-are-event-emitters/'>What are Event Emitters?</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.digitalocean.com/community/tutorials/using-event-emitters-in-node-js'>Using Event Emitters in Node.js</BadgeLink>
