I have been working on redoing the [roadmaps](https://roadmap.sh) – splitting the skillset based on the seniority levels to make them easier to follow and not scare the new developers away. Since the roadmaps are going to be just about the technical knowledge, I thought it would be a good idea to reiterate and have an article on what I think of different seniority roles.

I have seen many organizations decide the seniority of developers by giving more significance to the years of experience than they should. I have seen developers labeled "Junior" doing the work of Senior Developers and I have seen "Lead" developers who weren't even qualified to be called "Senior". The seniority of a developer cannot just be decided by their age, years of experience or technical knowledge that they have got. There are other factors in play here -- their perception of work, how they interact with their peers and how they approach problems. We discuss these three key factors in detail for each of the seniority levels below.

### Different Seniority Titles
Different organizations might have different seniority titles but they mainly fall into three categories:

* Junior Developer
* Mid Level Developer
* Senior Developer

### Junior Developer
Junior developers are normally fresh graduates and it's either they don't have or they have minimal industry experience. Not only they have weak coding skills but there are also a few other things that give Junior developers away:

* Their main mantra is "making it work" without giving much attention to how the solution is achieved. To them, a working software and good software are equivalent. 
* They usually require very specific and structured directions to achieve something. They suffer from tunnel vision, need supervision and continuous guidance to be effective team members.
* Most of the Junior developers just try to live up to the role and, when stuck, they might leave work for a senior developer instead of at least trying to take a stab at something.
* They don't know about the business side of the company and don't realize how management/sales/marketing/etc think and they don't realize how much rework, wasted effort, and end-user aggravation could be saved by getting to know the business domain.
* Over-engineering is a major problem, often leading to fragility and bugs.
* When given a problem, they often try to fix just the current problem a.k.a. fixing the symptoms instead of fixing the root problem.
* You might notice the "[Somebody Else's Problem](https://en.wikipedia.org/wiki/Somebody_else%27s_problem)" behavior from them.
* They don't know what or how much they don't know, thanks to the [Dunning–Kruger effect](https://en.wikipedia.org/wiki/Dunning%E2%80%93Kruger_effect).
* They don't take initiatives and they might be afraid to work on an unfamiliar codebase.
* They don't participate in team discussions.

Being a Junior developer in the team is not necessarily a bad thing; since you are just starting out, you are not expected to be a know-it-all person. However, it is your responsibility to learn, gain experience, not get stuck with the "Junior" title and improve yourself. Here are a few tips for Junior developers to help move up the ladder of seniority:

* All sorts of problems can be solved if you work on them long enough. Do not give up if Stack Overflow or an issue on GitHub doesn't have an answer. Saying "I am stuck, but I have tried X, Y, and Z. Do you have any pointers?" to your lead is much better than saying "This is beyond me."
* Read a lot of code, not just code in the projects that you are working on, but reference/framework source code, open-source. Ask your fellow developers, perhaps on Reddit too, about the good open-source examples for the language/tools of your choice. 
* Do personal side-projects, share them with people, contribute to the open-source community. Reach out to people for help. You will be surprised how much support you can get from the community. I still remember my first open-source project on GitHub from around 6 years ago which was a small PHP script (a library) that fetched details for a given address from Google's Geocoding API. The codebase was super messy, it did not have any tests, did not have any linters or sniffers, and it did not have any CI because I didn't know about any of this at that time. I am not sure how but one kind soul somehow found the project, forked it, refactored it, "modernized" it, added linting, code sniffing, added CI and opened the pull request. This one pull request taught me so many things that I might have never learned that fast on my own because I was still in college, working for a small service-based company and doing just small websites all on my own without knowing what is right and what is not. This one PR on GitHub was my introduction to open-source and I owe everything to that. 
* Avoid what is known as ["Somebody Else's Problem Field"](https://en.wikipedia.org/wiki/Somebody_else%27s_problem) behavior. 
* When given a problem to solve, try to identify the root cause and fix that instead of fixing the symptoms. And remember, not being able to reproduce means not solved. It is solved when you understand why it occurred and why it no longer does.
* Have respect for the code that was written before you. Be generous when passing judgment on the architecture or the design decisions made in the codebase. Understand that code is often ugly and weird for a reason other than incompetence. Learning to live with and thrive with legacy code is a great skill. Never assume anybody is stupid. Instead, figure out how these intelligent, well-intentioned and experienced people have come to a decision that is stupid now. Approach inheriting legacy code with an "opportunity mindset" rather than a complaining one.
* It's okay to not know things. You don't need to be ashamed of not knowing things already. There are no stupid questions, ask however many questions that would allow you to work effectively.
* Don't let yourself be limited by the job title that you have. Keep working on your self-improvement.
* Do your homework. Predict what’s coming down the pipe. Be involved in the team discussions. Even if you are wrong, you will learn something.
* Learn about the domain that you are working with. Understand the product end-to-end as an end-user. Do not assume things, ask questions and get things cleared when in doubt.
* Learn to communicate effectively - soft skills matter. Learn how to write good emails, how to present your work, how to phrase your questions in a thoughtful manner.
* Sit with the senior developers, watch them work, find a mentor. No one likes a know-it-all. Get hold of your ego and be humble enough to take lessons from experienced people.
* Don't just blindly follow the advice of "experts", take it with a grain of salt.
* If you are asked to provide an estimate for some work, do not give an answer unless you have all the details to make a reasonable estimate. If you are forced to do that, pad it 2x or more depending on how much you don't know about what needs to be done for the task to be marked 'done'.
* Take some time to learn how to use a debugger. Debuggers are quite beneficial when navigating new, undocumented or poorly documented codebase, or to debug weird issues. 
* Avoid saying "it works on my machine" -- yes, I have heard that a lot.
* Try to turn any feelings of inadequacy or imposter syndrome into energy to push yourself forward and increase your skills and knowledge.

### Mid Level Developers
The next level after the Junior developers is Mid Level developers. They are technically stronger than the Junior developers and can work with minimal supervision. They still have some issues to address in order to jump to Senior level.

Intermediate developers are more competent than the Junior developer. They start to see the flaws in their old codebase. They gain the knowledge but they get trapped into the next chain i.e. messing things up while trying to do them "the right way" e.g. hasty abstractions, overuse or unnecessary usage of Design Patterns -- they may be able to provide solution faster than the Junior developers but the solution might put you into another rabbit-hole in the long run. Without supervision, they might delay the execution while trying to "do things properly". They don't know when to make tradeoffs and they still don't know when to be dogmatic and when to be pragmatic. They can easily become attached to their solution, become myopic, and be unable to take feedback.

Mid-level developers are quite common. Most of the organizations wrongly label them as "Senior Developers". However, they need further mentoring in order to become Senior Developers. The next section describes the responsibilities of a senior developer and how you can become one.

### Senior Developers
Senior developers are the next level after the Mid-level developers. They are the people who can get things done on their own without any supervision and without creating any issues down the road. They are more mature, have gained experience by delivering both good and bad software in the past and have learned from it — they know how to be pragmatic. Here is the list of things that are normally expected of a Senior Developer:

* With their past experiences, mistakes made, issues faced by over-designed or under-designed software, they can foresee the problems and persuade the direction of the codebase or the architecture. 
* They don't have a "Shiny-Toy" syndrome. They are pragmatic in the execution. They can make the tradeoffs when required, and they know why. They know where to be dogmatic and where to be pragmatic.
* They have a good picture of the field, know what the best tool for the job is in most cases (even if they don't know the tool). They have the innate ability to pick up a new tool/language/paradigm/etc in order to solve a problem that requires it.
* They are aware they're on a team. They view it as a part of their responsibility to mentor others. This can range from pair programming with junior devs to taking un-glorious tasks of writing docs or tests or whatever else needs to be done.
* They have a deep understanding of the domain - they know about the business side of the company and realize how management/sales/marketing/etc think and benefit from their knowledge of the business domain during the development.
* They don't make empty complaints, they make judgments based on the empirical evidence and they have suggestions for solutions.
* They think much more than just code - they know that their job is to provide solutions to the problems and not just to write code.
* They have the ability to take on large ill-defined problems, define them, break them up, and execute the pieces. A senior developer can take something big and abstract, and run with it. They will come up with a few options, discuss them with the team and implement them.
* They have respect for the code that was written before them. They are generous when passing judgment on the architecture or the design decisions made in the codebase. They approach inheriting legacy code with an "opportunity mindset" rather than a complaining one.
* They know how to give feedback without hurting anyone.

### Conclusion
All teams are made up of a mix of all these seniority roles. Being content with your role is a bad thing and you should always strive to improve yourself for the next step. This article is based on my beliefs and observations in the industry. Lots of companies care more for the years of experience to decide the seniority which is a crappy metric -- you don't gain experience just by spending years. You gain it by continuously solving different sorts of problems, irrespective of the number of years you spend in the industry. I have seen fresh graduates having no industry experience get up to speed quickly and producing work of a Senior Engineer and I have seen Senior developers labeled "senior" merely because of their age and "years of experience". 

The most important traits that you need to have in order to step up in your career are: not settling with mediocrity, having an open mindset, being humble, learning from your mistakes, working on the challenging problems and having an opportunity mindset rather than a complaining one.

With that said, this post comes to an end. What are your thoughts on the levels of seniority of developers? Feel free to send improvements to this guide. Until next time, stay tuned!
