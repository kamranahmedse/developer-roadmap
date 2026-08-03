# Columns vs Measures

Calculated columns compute a value for every row in a table and store the result physically in the model, while measures calculate a value on the fly based on the current filter context of a visual. Columns are useful when a value needs to be sliced or filtered on directly, while measures are used for aggregations that should respond dynamically to whatever is selected in a report. Choosing the wrong one can lead to unnecessary model size or incorrect calculation behavior.

Visit the following resources to learn more:

- [@article@Measures vs Calculated Columns in DAX and Power BI](https://endjin.com/blog/measures-vs-calculated-columns-in-dax)
- [@article@Calculated Columns and Measures in DAX](https://www.sqlbi.com/articles/calculated-columns-and-measures-in-dax/)
- [@video@Measures vs. calculated columns in DAX and Power BI](https://www.youtube.com/watch?v=ePPi1LLX0sA)