# Context Transition

Context transition happens when CALCULATE turns the current row context into an equivalent filter context, which occurs whenever CALCULATE is used inside a row context, such as within a calculated column. This mechanism explains behavior that otherwise seems inconsistent, like a measure returning different results depending on where it is called from. It is one of the more subtle but important behaviors to understand in DAX.

Visit the following resources to learn more:

- [@article@Context transition in DAX explained visually](https://www.sqlbi.com/articles/context-transition-in-dax-explained-visually/)
- [@article@DAX 101: Understanding context transition in DAX](https://www.sqlbi.com/articles/understanding-context-transition-in-dax/)
- [@video@Understanding context transition](https://www.youtube.com/watch?v=lMuDz6ViU1w)