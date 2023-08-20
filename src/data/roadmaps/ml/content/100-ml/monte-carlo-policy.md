# Monte Carlo Reinforcement Learning
The Monte Carlo method for reinforcement learning learns directly from episodes of experience without any prior knowledge of MDP transitions. Here, the random component is the return or reward.

One caveat is that it can only be applied to episodic MDPs. Its fair to ask why, at this point. The reason is that the episode has to terminate before we can calculate any returns. Here, we don’t do an update after every action, but rather after every episode. It uses the simplest idea – the value is the mean return of all sample trajectories for each state.

# Monte Carlo Policy Evaluation
<img src="https://cdn.analyticsvidhya.com/wp-content/uploads/2018/11/im_6.png">
<ul> <li>i – Episode index</li>
  <li>s – Index of state</li></ul>
<a href="https://www.analyticsvidhya.com/blog/2018/11/reinforcement-learning-introduction-monte-carlo-learning-openai-gym/">Read More</a>
<br>

# Youtube Links
<ul> <li><a href="https://youtu.be/bpUszPiWM7o">Monte Carlo And Off-Policy Methods</a></li>
  <li><a href="https://youtu.be/uiPhlFrwcw8">Monte Carlo Methods</a></li>
 </ul>
 
# Related Blogs
<ul> <li><a href="https://towardsdatascience.com/monte-carlo-learning-b83f75233f92">Monte Carlo Learning</a></li>
  <li><a href="https://medium.datadriveninvestor.com/reinforcement-learning-monte-carlo-for-policy-evaluation-312fd2e8331d">Monte Carlo for policy methods</a></li>
  <li><a href="https://medium.com/data-science-in-your-pocket/monte-carlo-for-reinforcement-learning-with-example-1754439dd628">Monte carlo for RL</a></li>
 </ul>
 
