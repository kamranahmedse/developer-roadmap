To check the quality of a random dataset, I'll:

- **Understand the problem context:** The first thing to do is to make sure you understand the goal you aim to achieve before looking at the dataset. This allows you to know from first glance whether the dataset matches the problem. If the data has irrelevant columns, you should remove them.

- **Test the data quality:** For any problem you are solving, it has most likely been solved before. You can test your dataset against a trusted dataset to measure any deviations that might be in the data. The dataset also needs to represent real-world scenarios.

- **Technical checks:** With technical checks, it's good to remove duplicates in the data. Noise could be present with blurry images or mislabeled samples. You also have to make sure everything is formatted correctly in a consistent format.

- **Assess practical utility:** The dataset has to be big enough for what you need it to do. For traditional machine learning, the dataset should be more than 10 times greater than the number of features per class. For deep learning, you should aim for 100 features per class to help avoid overfitting.

A dataset is only useful when it aligns with the problem's context and goals. It must pass accuracy, completeness, and balance checks. Finally, it must meet size and representative requirements. 