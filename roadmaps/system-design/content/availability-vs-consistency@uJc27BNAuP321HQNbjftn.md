# Availability vs Consistency
 
In a distributed system, availability and consistency often pull in opposite directions when a network partition happens. A system can either keep serving requests using potentially stale data, favoring availability, or refuse to respond until all nodes agree, favoring consistency. Which one a system prioritizes depends on the use case.

Visit the following resources to learn more:

- [@opensource@CAP FAQ](https://github.com/henryr/cap-faq)
- [@article@CAP Theorem Revisited](https://robertgreiner.com/cap-theorem-revisited/)
- [@article@A plain english introduction to CAP Theorem](http://ksat.me/a-plain-english-introduction-to-cap-theorem)
- [@video@CAP Theorem](https://www.youtube.com/watch?v=_RbsFXWRZ10&t=1s)