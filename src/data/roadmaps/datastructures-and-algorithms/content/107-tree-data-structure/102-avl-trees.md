# AVL Trees

An **AVL tree** is a type of binary search tree that is self-balancing, which means the heights of the two child subtrees of any node in the tree differ by at most one. If at any point the difference becomes greater than one, rebalancing is done to restore the property. The tree is named after its inventors, G.M. Adelson-Velsky and E.M. Landis, who introduced it in 1962. Each node in an AVL tree carries extra information (its Balance Factor) which could be either -1, 0, or +1. AVL trees balance themselves by rotating sub-trees in different manners(named as Left-Left rotation, Right-Right rotation, Left-Right rotation, and Right-Left rotation) whenever an insert operation causes the balance factor to go beyond this range.

- [@article@AVL Tree](https://www.w3schools.com/dsa/dsa_data_avltrees.php)
