# Plan Mode

Plan Mode is a strictly read-only permission state that allows Claude to analyze your codebase, research dependencies, and draft a step-by-step implementation strategy without the risk of modifying any files or executing state-changing commands. It is essentially an "architectural phase" where Claude uses search and analysis tools to build a deep mental model of your project, culminating in a detailed plan for your review before a single line of code is written. You can access the plan by typing `Ctrl+G`. You should use Plan Mode when tackling complex refactors, exploring unfamiliar repositories, or designing new features with multiple moving parts, as it forces a "think-before-you-act" workflow that prevents costly mistakes and ensures the AI fully understands the project's constraints.

Visit the following resources to learn more:

- [@official@How to use Plan Mode](https://code.claude.com/docs/en/common-workflows#how-to-use-plan-mode)
- [@official@Explore first, then plan, then code](https://code.claude.com/docs/en/best-practices#explore-first-then-plan-then-code)
- [@article@What Actually Is Claude Code’s Plan Mode?](https://lucumr.pocoo.org/2025/12/17/what-is-plan-mode/)
- [@article@Claude Code Plan Mode | Developing with AI Tools | Steve Kinney](https://stevekinney.com/courses/ai-development/claude-code-plan-mode)
- [@video@I was an AI skeptic. Then I tried plan mode](https://www.youtube.com/watch?v=WNx-s-RxVxk&t=70s)
- [@video@How I Use Claude Code Plan Mode: 3 Examples](https://www.youtube.com/watch?v=altX5elI-1k)