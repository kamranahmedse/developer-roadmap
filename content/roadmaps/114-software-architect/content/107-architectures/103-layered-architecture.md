# Layered architecture
Layered architectures are said to be the most common and widely used architectural framework in software development. It is also known as an n-tier architecture and describes an architectural pattern composed of several separate horizontal layers that function together as a single unit of software. A layer is a logical separation of components or code.
It's the de-facto architecture style of modern web applications. Layered architecture matches to the well-known "single responsibility principle".

### Characteristics
* A major characteristic of this framework is that layers are only connected to the layers directly below them.
* Another characteristic is the concept of layers of isolation. This means that layers can be modified and the change won't affect other layers. In short, changes are isolated to the specific layer that is altered.
* Separation of concerns is another notable feature that speaks to how the modules on a single layer together perform a single function.

### Advantages
* The framework is simple and easy to learn and implement.
* There is reduced dependency because the function of each layer is separate from the other layers.
* Testing is easier because of the separated components, each component can be tested individually.
* Cost overheads are fairly low.
* Changeability. If you're not satisfy with the implementation of one layer, you can replace it with another layer, as long as they implements the same interface.

### Disadvantages
* Scalability is difficult because the structure of the framework does not allow for growth.
* They can be difficult to maintain. A change in a single layer can affect the entire system because it operates as a single unit.
* There is interdependence between layers since a layer depends on the layer above it to receive data.
* Parallel processing is not possible.
* Management cost if there are too many layers.
* The performance is getting slower as more and more layers added.
* Leaky abstraction can disturb your layered intent.