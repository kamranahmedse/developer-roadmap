# disown

`disown` is a shell built-in command used to remove jobs from the shell's job control. When you start a process in the background (using `&`), the shell keeps track of it. If you close the terminal, the shell usually sends a SIGHUP signal to these background processes, which often causes them to terminate. `disown` removes a process from this job control, preventing the shell from sending that signal when the terminal closes, allowing the process to continue running independently.

Visit the following resources to learn more:

- [@article@Linux / Unix: disown Command Examples](https://www.cyberciti.biz/faq/unix-linux-disown-command-examples-usage-syntax/)
- [@article@How to Use Disown Command in Linux](https://phoenixnap.com/kb/disown-command-linux)
- [@video@Linux | Background Process Basics and Signals | & , disown, nohup](https://www.youtube.com/watch?v=OQpnQgvmbhY)
- [@video@How to use the disown command: 2-Minute Linux Tipsv](https://www.youtube.com/watch?v=B66HKmP03Xo)