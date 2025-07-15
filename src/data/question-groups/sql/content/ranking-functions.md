These functions assign ranks or row numbers based on ordering criteria. They behave differently when there are ties:

- `ROW_NUMBER()` assigns a unique number to each row, even if the values are the same.
- `RANK()` gives the same rank to tied rows and skips the next rank.
- `DENSE_RANK()` also gives the same rank to ties but doesn't skip any numbers.

![Difference between Rank, Dense_Rank and Row_Number](https://assets.roadmap.sh/guest/difference-between-rank-dense-rank-and-row-number-rubpc.png)

They're helpful in tasks like leaderboard generation or identifying top performers by region or category. 