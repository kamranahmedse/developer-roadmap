# Embedding

The representations of values of objects like text, images, audio in a **multi-dimensional** space to create relationship between unstructured data is known as Embeddings or more specifically, Vector Embeddings. These embeddings are designed to be consumed by machine learning models and semantic search algorithms.

### Explanation:
Understanding this using an considering an example dataset of random collection of all the Pokemons. (e.g., Squirtle, Bulbasaur, etc). The idea is to train a Pokemon Battle ML model to predict which Pokemon will win the battle.

We know a few things like, Fire type would be better agains Bug type Pokemon. Thus having relationship in the data is important for better performance of an ML model. What if we could relate all the Pokemons with similar abilities? Imagine a huge free space around you, let's give a point to Pikachu in this space. Raichu is 1 metres to the right of Pikachu. And Butterfree is at extremely opposite side of Pikachu. Now that we have a relationship between all these Pokemons we can predict which battle will be close and which will be a one sided win for a Pokemon.

The points we assigned to these Pokemons are called embeddings and the imagined space is called Vector Space. Although mathematically it is a multi-dimensional space which is very hard to imagine in reality.

![image](https://github.com/user-attachments/assets/d0aec3f3-d57b-4e88-b6e4-3c1a4b818dae)

Visit the following resources to learn more:

- [@article@HuggingFace: Getting Started](https://huggingface.co/blog/getting-started-with-embeddings)
- [@video@FreeCodeCamp: Vector Embeddings Tutorial](https://youtu.be/yfHHvmaMkcA?si=pOEJtC_pRslFU-fv)
- [@video@FreeCodeCamp: Understand Vector Search](https://youtu.be/JEBDfGqrAUA?si=xe1fIUJVBIjmpLJd)
