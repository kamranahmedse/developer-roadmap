# Underfitting:
 A statistical model or a machine learning algorithm is said to have underfitting when it cannot capture the underlying trend of the data, i.e., it only performs well on training data but performs poorly on testing data. (It’s just like trying to fit undersized pants!) Underfitting destroys the accuracy of our machine learning model. Its occurrence simply means that our model or the algorithm does not fit the data well enough. It usually happens when we have fewer data to build an accurate model and also when we try to build a linear model with fewer non-linear data. In such cases, the rules of the machine learning model are too easy and flexible to be applied to such minimal data and therefore the model will probably make a lot of wrong predictions. Underfitting can be avoided by using more data and also reducing the features by feature selection.

 Resoures for underfitting:
 
 1.High bias and low variance.
 
 2.The size of the training dataset used is not enough.
 
 3.The model is too simple.
 
 4.Training data is not cleaned and also contains noise in it.
 
 **Techniques to reduce underfitting:**
 
 1.Increase model complexity.
 
 2.increase the number of features, performing feature engineering.
 
 3.Remove noise from the data.
 
 4.Increase the number of epochs or increase the duration of training to get better results.
 
Underfitting occurs when our machine learning model is not able to capture the underlying trend of the data. To avoid the overfitting in the model, the fed of training data can be stopped at an early stage, due to which the model may not learn enough from the training data. As a result, it may fail to find the best fit of the dominant trend in the data.

In the case of underfitting, the model is not able to learn enough from the training data, and hence it reduces the accuracy and produces unreliable predictions.


An underfitted model has high bias and low variance.

## How to avoid underfitting:

1.By increasing the training time of the model.

2.By increasing the number of features.

![underfitting](https://static.javatpoint.com/tutorial/machine-learning/images/overfitting-and-underfitting2.png)

## What is underfitting? ##

Underfitting occurs when a model is too simple to capture the underlying structure of the data. This means that the model has not learned enough from the training data and is unable to make accurate predictions on new data. Underfitting can be easily identified by a high training error and a high test error. In other words, the model is not fitting the training data well, and as a result, it is also not able to generalize well to new data.

There are several reasons why a model may underfit the data. One common reason is using a model that is too simple for the complexity of the problem. For example, if you are trying to predict the price of a house based on its size and age, using a linear regression model may underfit the data because the relationship between the price and the size/age of a house may not be linear.
Another reason for underfitting may be using too little traini#ng data. If the model is not exposed to enough examples, it may not learn the underlying patterns in the data and therefore fail to generalize well to new data.



![Tutorial Reprasentation](https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190523171258/overfitting_2.png)

# Overfitting: #

A statistical model is said to be overfitted when the model does not make accurate predictions on testing data. When a model gets trained with so much data, it starts learning from the noise and inaccurate data entries in our data set. And when testing with test data results in High variance. Then the model does not categorize the data correctly, because of too many details and noise. The causes of overfitting are the non-parametric and non-linear methods because these types of machine learning algorithms have more freedom in building the model based on the dataset and therefore they can really build unrealistic models. A solution to avoid overfitting is using a linear algorithm if we have linear data or using the parameters like the maximal depth if we are using decision trees. 

In a nutshell, Overfitting is a problem where the evaluation of machine learning algorithms on training data is different from unseen data.

## Reasons for Overfitting are as follows: ##

1.High variance and low bias

2.The model is too complex

3.The size of the training data 

Overfitting occurs when our machine learning model tries to cover all the data points or more than the required data points present in the given dataset. Because of this, the model starts caching noise and inaccurate values present in the dataset, and all these factors reduce the efficiency and accuracy of the model. The overfitted model has ** low bias ** and ** high variance **.

The chances of occurrence of overfitting increase as much we provide training to our model. It means the more we train our model, the more chances of occurring the overfitted model.

Overfitting is the main problem that occurs in *supervised learning*.

## How to avoid the Overfitting in Model:

Both overfitting and underfitting cause the degraded performance of the machine learning model. But the main cause is overfitting, so there are some ways by which we can reduce the occurrence of overfitting in our model.

1.Cross-Validation

2.Training with more data

3.Removing features

4.Early stopping the training

5.Regularization

6.Ensembling

![overfitting](https://static.javatpoint.com/tutorial/machine-learning/images/overfitting-and-underfitting.png)

# What Is a Good Fit In Machine Learning?

To find the good fit model, you need to look at the performance of a machine learning model over time with the training data. As the algorithm learns over time, the error for the model on the training data reduces, as well as the error on the test dataset. If you train the model for too long, the model may learn the unnecessary details and the noise in the training set and hence lead to overfitting. In order to achieve a good fit, you need to stop training at a point where the error starts to increase.

![GOOD FIT](https://www.simplilearn.com/ice9/free_resources_article_thumb/Good_fit_model.PNG)

# To know

[Learn more about Overfitting and Underfitting](https://youtu.be/jnAeZ8j0Ur0)

## Coursera Course:

https://www.coursera.org/lecture/data-science-fundamentals-for-data-analysts/overfitting-and-underfitting-vhRrM

# Conclusion:

Overfitting and Underfitting are two vital concepts that are related to the bias-variance trade-offs in machine learning. In this tutorial, you learned the basics of overfitting and underfitting in machine learning and how to avoid them. You also looked at the various reasons for their occurrence.
If you are looking to learn the fundamentals of machine learning and get a comprehensive work-ready understanding of it, Simplilearn’s*AI ML Course*in partnership with Purdue & in collaboration with IBM. should be ideal for you. This 12-month long bootcamp program features comprehensive applied training in key concepts of Machine learning, Deep Learning with *Keras and Tensorflow*, Advanced deep learning and Computer Vision, *Natural Language Processing* and more.
