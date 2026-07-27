# Veto

`Veto` is often used in multiplayer games to prevent or allow certain actions during the game. For instance, players can issue commands to block specific actions from their opponents. As a server-side game developer, you must ensure security measures are in place to validate the authenticity of these commands to safeguard against potential vulnerability. A veto vulnerability can occur when malicious players manipulate veto commands to their advantage or disrupt the game, which can lead to an unfair gaming environment or even crash the server. Therefore, your code should always verify who is sending veto commands and check the validity of these commands.

Visit the following resources to learn more:

- [@article@OWASP Game Security Framework](https://owasp.org/www-project-gamesec-framework/OGSF)
- [@article@Validating User Actions on the Server - GameDev Stack Exchange](https://gamedev.stackexchange.com/questions/101290/validating-user-actions-on-the-server)
- [@article@Using the Anti-Cheat Interfaces - Epic Games Developers](https://dev.epicgames.com/docs/game-services/anti-cheat/using-anti-cheat)