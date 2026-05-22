# Actor Model

The **Actor Model** is a conceptual model to deal with concurrent computation. It defines some general rules for how the system's components should behave and interact with each other. In the Actor Model, each object (actor) has its own private state and communication with other actors is done by exchanging messages. Actors read messages from a personal mailbox and may change their own inner state, create more actors, or send messages to other actors. The Actor Model makes it easier for developers to write concurrent and distributed systems by providing high-level abstractions over low-level threading details.
Visit the following resources to learn more:

- [@article@How the Actor Model Works by Example - TheServerSide](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/How-the-Actor-Model-works-by-example)
- [@official@How the Actor Model Meets the Needs of Modern Distributed Systems - Akka Docs](https://doc.akka.io/libraries/akka-core/current/typed/guide/actors-intro.html)
- [@article@Actor Model - Wikipedia](https://en.wikipedia.org/wiki/Actor_model)
