# Tries

A trie is a tree structure built from the characters of strings, where each path from the root to a marked node spells out a word. It is the right data structure when you need fast prefix lookups across a large set of strings. A hash map can check if a whole word exists, but a trie can check if any word in your dictionary starts with a given prefix in O(length) time. The three problems in this stage cover building a trie, searching with wildcards, and using a trie to prune a grid search, which together cover the full range of trie applications in interviews.

Visit the following resources to learn more:

- [@article@Trying to Understand Tries](https://medium.com/basecs/trying-to-understand-tries-3ec6bede0014)
- [@video@Data Structures: Tries](https://www.youtube.com/watch?v=zIjfhVPRZCg)