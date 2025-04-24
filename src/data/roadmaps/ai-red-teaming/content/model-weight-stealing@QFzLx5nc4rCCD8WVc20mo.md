# Model Weight Stealing

(AI Red Teamers assess the risk of attackers reconstructing or stealing the proprietary weights of a trained model, often through API query-based attacks. Testing involves simulating such attacks to understand how easily the model's functionality can be replicated, which informs defenses like query rate limiting, watermarking, or differential privacy.)

Learn more from the following resources:

- [@article@A Playbook for Securing AI Model Weights - RAND](https://www.rand.org/pubs/research_briefs/RBA2849-1.html) - Discusses attack vectors and security levels for protecting model weights.
- [@article@How to Steal a Machine Learning Model (SkyCryptor)](https://skycryptor.com/blog/how-to-steal-a-machine-learning-model) - Explains model weight extraction via query attacks.
- [@paper@Defense Against Model Stealing (Microsoft Research)](https://www.microsoft.com/en-us/research/publication/defense-against-model-stealing-attacks/) - Research on detecting and defending against model stealing.
- [@paper@On the Limitations of Model Stealing with Uncertainty Quantification Models - OpenReview](https://openreview.net/pdf?id=ONRFHoUzNk) - Research exploring model stealing techniques.
