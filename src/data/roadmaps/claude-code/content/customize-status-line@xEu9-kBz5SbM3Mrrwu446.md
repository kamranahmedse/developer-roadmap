# Customize Status Line

Claude Code allows you to personalize your terminal environment by customizing the status line, which is the persistent information bar at the bottom of the interface. This feature functions as a dynamic dashboard that receives a real-time JSON payload containing metadata—such as your active Git branch, the model in use, and critical context window metrics—and processes it through a script to display custom text or emojis. You can quickly configure a preset using the `/statusline` command or achieve deep customization by pointing the statusLine configuration in your `settings.json` to a custom shell script that parses inputs. By tailoring this bar, you can keep essential data like real-time session costs or context usage percentages visible at all times, helping you manage your budget and "context rot" without manually running diagnostic commands.

Visit the following resources to learn more:

- [@official@Customize Status Line](https://code.claude.com/docs/en/statusline)
- [@video@Your Claude Code Terminal Should Look Like This](https://www.youtube.com/watch?v=fiZfVTsPy-w)
- [@video@Claude Code StatusLine Explained (Free Script Generator)](https://www.youtube.com/watch?v=PB9_Q2tfe90)