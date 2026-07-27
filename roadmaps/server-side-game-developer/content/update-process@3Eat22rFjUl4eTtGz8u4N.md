# Update Process

In the reactive model, the client sends requests to the server, which then processes the request and sends back a response. This model is called 'reactive' because the server only acts or 'reacts' when it receives a request from the client. The "update process" plays a vital role in this model. It's the server's responsibility to keep the game world updated and synchronized among all players. This updating process is typically done in a loop that processes all the changes that happen in the game like players’ actions, NPC movements, in-game events or game physics. It updates the game world and informs the players about the changes. Also, if a player makes changes like moving a character or attacking an enemy, it sends this information to the server adding it to the update loop. The frequency of this updating process is often referred to as 'tick rate'.

Visit the following resources to learn more:

- [@article@Game Server Tick Rate Explained: Gameplay Precision vs Infrastructure Cost - Edgegap](https://edgegap.com/blog/game-server-tick-rate-explained-gameplay-precision-vs-infrastructure-cost)
- [@article@Tick and update rates - Unity Netcode for GameObjects](https://docs.unity3d.com/Packages/com.unity.netcode.gameobjects@2.4/manual/learn/ticks-and-update-rates.html)
- [@article@Game Loop - Game Programming Patterns](https://gameprogrammingpatterns.com/game-loop.html)