# Key Management Strategy

> Decide on a key-management strategy from the start.

Are you going to have one key-pair per group of instances, or are you going to have one key-pair you use for your entire account? It's easy to modify your authorized-keys file with a bootstrap script of course, but you need to decide if you want to manage multiple key-pairs or not, as things will get complicated later on if you try to change your mind.
