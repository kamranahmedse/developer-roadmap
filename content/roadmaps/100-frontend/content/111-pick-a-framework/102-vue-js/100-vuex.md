<h1> What is Vuex ? </h1>

<p><b>Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. It also integrates with Vue's official devtools extension to provide advanced features such as zero-config time-travel debugging and state snapshot export / import.</b></p>


Vuex helps us deal with shared state management with the cost of more concepts and boilerplate. It's a trade-off between short term and long term productivity.
It is a self-contained app with the following parts:
<ul>
<li>The state, which is the source of truth that drives our app;</li>
<li>The view, which is just a declarative mapping of the state;</li>
<li>The actions, which are the possible ways the state could change in reaction to user inputs from the view.</li>
  </ul>

<p>If you've never built a large-scale SPA and jump right into Vuex, it may feel verbose and daunting. That's perfectly normal - if your app is simple, you will most likely be fine without Vuex. A simple store pattern (opens new window)may be all you need. But if you are building a medium-to-large-scale SPA, chances are you have run into situations that make you think about how to better handle state outside of your Vue components, and Vuex will be the natural next step for you. There's a good quote from Dan Abramov, the author of Redux: </p>

    <quote>Flux libraries are like glasses: you’ll know when you need them.</quote>
