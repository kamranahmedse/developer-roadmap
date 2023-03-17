# Polynomial Regression resources

**Polynomial regression** is a type of regression analysis in which the relationship between the independent variable x and the dependent variable y is modeled as an nth degree polynomial.
In simple terms, it is a ***curve-fitting technique*** that fits a polynomial equation to the data points.

The general form of a polynomial regression equation is:

>  y = β0 + β1x + β2x^2 + β3x^3 + … + βnx^n 

For example, if we have a dataset with one independent variable (x) and one dependent variable (y), and we want to fit a polynomial equation of degree 2 (quadratic equation), the equation would be:
> y = a + bx + cx^2

where a, b, and c are the coefficients of the equation that need to be estimated from the data.

## Why we need Polynomial Regression
If your data points clearly will not fit a linear regression (a straight line through all data points), it might be ideal for polynomial regression.
There are several reasons why we might need polynomial regression. One reason is that many real-world phenomena have non-linear relationships.

For example, the relationship between temperature and the amount of ice cream sold is likely to be non-linear, as people are more likely to buy ice cream when it is hot, but there is likely to be a point at which it is so hot that people stop buying ice cream. In such cases, polynomial regression can help us model the relationship more accurately than linear regression.

### Linear Regression vs Polynomial Regression


![Linear Regression vs Polynomial Regression](https://imgs.search.brave.com/vcBqwgnCvHLxbM24eWNL3n2Kbl0edTnujnUi5p8XFuM/rs:fit:948:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4w/MXp3bGtSS01RbzFp/Q1BMazE3ZG9BSGFE/dCZwaWQ9QXBp)

For more information : [Polynomial Regression](https://towardsdatascience.com/polynomial-regression-bbe8b9d97491)

## Types of polynomial regression
There are three types of polynomial regression: *linear*, *quadratic*, and *cubic*.

**Linear polynomial regression:** In linear polynomial regression, the polynomial function is of the form y = b0 + b1x. This is equivalent to simple linear regression.

**Quadratic polynomial regression:** In quadratic polynomial regression, the polynomial function is of the form y = b0 + b1x + b2x^2. This produces a parabolic curve.

**Cubic polynomial regression:** In cubic polynomial regression, the polynomial function is of the form y = b0 + b1x + b2x^2 + b3x^3. This produces an S-shaped curve.

