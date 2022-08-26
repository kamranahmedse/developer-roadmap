# Storage Slots

Each smart contract running in the Ethereum Virtual Machine (EVM) maintains state in its own permanent storage. This storage can be thought of as a very large array, initially full of zeros. Each value in the array is 32-bytes wide, and there are 2^256 such values. A smart contract can read from or write to a value at any location. That’s the extent of the storage interface. The storage mechanism ensures there are no conflicts in storage locations and follows a set of rules. Using these rules we can decode the state of any contract. Decoding the data stored in a map requires knowing the keys that are used. Decoding of contract data is performed using the RPC call eth_getStorageAt().

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink badgeText='Read' colorScheme='yellow' href='https://programtheblockchain.com/posts/2018/03/09/understanding-ethereum-smart-contract-storage/'>Understanding Ethereum Smart Contract Storage</BadgeLink>
<BadgeLink badgeText='Read' colorScheme='yellow' href='https://medium.com/coinmonks/decoding-the-memory-of-an-ethereum-contract-52c256f83f07'>Decoding the Storage of an Ethereum Contract</BadgeLink>