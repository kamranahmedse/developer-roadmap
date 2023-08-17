# Amortized SVGD (Stein Variational Gradient Descent)

Stein variational gradient descent (SVGD) [1] is a deterministic, gradient-based sampling algorithm for approximate inference. Given a probability density function by a simple iterative update of form.


Compared with Monte Carlo methods, SVGD can achieve good approximation even with a very small number of particles. A simple way to see this is to note that when using only a single particle, which is often found to be a useful approximation in many difficult practical problems. 

SVGD with more particles interpolates between gradient descent and approximate inference and provides better uncertainty assessment.

</br>

# Sources of Amortized SVGD (Stein Variational Gradient Descent): 

- [SVGD by depthfirstlearning](https://www.depthfirstlearning.com/2020/SVGD)

- [SVGD by Research Gate](https://www.researchgate.net/publication/318584457_Learning_to_Draw_Samples_with_Amortized_Stein_Variational_Gradient_Descent)

- [Gradient Descent](https://www.youtube.com/watch?v=sDv4f4s2SB8)

- [by Justin Pauckert](https://www.youtube.com/watch?v=znVcfdVILs0)

- [Geometry of SVGD](https://www.youtube.com/watch?v=2tiu3HDJjE4)
