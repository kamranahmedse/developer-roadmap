# Scale Horizontally

I've found that using lots of smaller machines is generally more reliable than using a smaller number of larger machines. You need to balance this though, as trying to run your application from 100 t1.micro instances probably isn't going to work very well. Breaking your application into lots of smaller instances means you'll be more resiliant to failure in one of the machines. If you're just running from two massive compute cluster machines, and one goes down, things are going to get bad.
