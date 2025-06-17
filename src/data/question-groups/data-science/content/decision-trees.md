A decision tree is a machine learning algorithm used for classification and regression tasks. It makes decisions by following a tree-like structure where internal nodes represent attribute tests, branches represent attribute values, and leaf nodes represent predictions.

![Decision tree](https://assets.roadmap.sh/guest/decision-tree-y4hrk.png)

Decision trees are versatile and are used for many machine learning tasks.

**Example**: Loan approval decision tree

- **Step 1 – Ask a question (Root Node)**: Is the applicant's credit score > 700?
  - If yes, go to Internal Node.
  - If no, go to Leaf Node (Do not approve the loan).
- **Step 2 – More questions (Internal Nodes)**: Is the applicant's income > $50,000?
  - If yes, approve the loan (Leaf Node).
  - If no, go to Leaf Node (Do not approve the loan).
- **Step 3 - Decision (Leaf Node)**
  - Leaf Node 1: Do not approve the loan (if credit score ≤ 700).
  - Leaf Node 2: Approve the loan (if credit score > 700 and income > $50,000).
  - Leaf Node 3: Do not approve the loan (if credit score > 700 and income ≤ $50,000).

**Common pitfall:** Trees tend to overfit the data if you allow it to go too deep and include too many branches. 