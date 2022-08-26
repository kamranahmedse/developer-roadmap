# Create vs Create2

## Create

When we create a contract from an externally owned account or from a contract using the vanilla CREATE operation, the address where the contract is created is easily determined. Every account has an associated nonce: for EOAs, this nonce is increased on every transaction sent. For contract accounts, it is increased on every contract created. The address of a new contract is calculated as a function of the account’s address and its nonce:

- address = hash(sender, nonce)

This leads to difficulties because if nonce of deployer would increase by any transaction, it will change "predicted" deployment address of contract.

## Create2

CREATE2 is a new opcode introduced in the Constantinople hard fork to provide an alternative to the original CREATE. The main difference lies in how the contract’s address is calculated. Instead of depending  on the account’s nonce, the new address is calculated as a hash of:

- address of the creator
- salt provided as a parameter
- contract creation code

None of these depend on the state of the creator. This means that you can create as many other contracts as you want, without worrying about the nonce, and still be able to deploy to the parked address whenever you need to.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink badgeText='Read' colorScheme='yellow' href='https://blog.openzeppelin.com/getting-the-most-out-of-create2/'>Getting the most out of CREATE2</BadgeLink>
<BadgeLink badgeText='Read' colorScheme='yellow' href='https://solidity-by-example.org/app/create2/'>Precompute Contract Address with Create2</BadgeLink>