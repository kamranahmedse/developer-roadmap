Event delegation is a technique where you define an event handler for a particular event as part of the parent element that contains the elements that will actually trigger the event.

![Event Delegation in JavaScript](https://assets.roadmap.sh/guest/event-delegation-explained-5e2vt.png)

When the event is triggered, it’ll bubble up in the DOM hierarchy until it reaches the parent’s event handler.
