Concept drift happens when the relationship between your input features and target variable changes over time, causing your model's performance to drop. It's common in dynamic environments (e.g., user behavior, market trends). COVID-19 is a real-world example: models trained pre-pandemic broke down because behavior and data patterns shifted.

**How to detect it:**

- **Set up reference vs. detection windows:** Compare a stable past dataset (e.g., January traffic) against a current window (e.g., this week). This gives you a baseline.
- **Compare distributions:** Use statistical tests (e.g., Kolmogorov–Smirnov, PSI, KL divergence) to detect shifts in data or feature distributions.
- **Track model performance over time:** Drop in precision, recall, or overall accuracy compared to your baseline = red flag.
- **Run significance tests:** This tells you if the drift is real or just noise. 