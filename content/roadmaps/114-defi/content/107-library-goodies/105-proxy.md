# Proxy

A proxy contract is a contract which delegates calls to another contract. To interact with the actual contract you have to go through the proxy and the proxy knows which contract to delegate the call to (the target).

A proxy pattern is used to achive upgradability for smart contracts. This way the proxy contract stays immutable, but a new contract can be deployed behind the proxy contract - by simply changing the target address inside the proxy contract.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink badgeText='Read' colorScheme='yellow' href='https://docs.openzeppelin.com/contracts/4.x/api/proxy'>Proxies</BadgeLink>