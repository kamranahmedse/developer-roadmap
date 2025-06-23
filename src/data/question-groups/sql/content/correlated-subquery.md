A correlated subquery uses values from the outer query and runs once for each row in the outer query. It can't run on its own because it depends on values outside its scope.

Use it when comparing each row to a related value, such as finding employees who earn more than the average salary in their department. 