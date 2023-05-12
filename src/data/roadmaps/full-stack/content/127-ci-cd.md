# Checkpoint — CI / CD

Now that you have the infrastructure setup, it's time to automate the deployment process. This is where CI / CD comes in. If you don't know what CI/CD are, you should watch [DevOps CI/CD Explained in 100 Seconds](https://www.youtube.com/watch?v=scEDHsr3APg).

The next step at this point is to implement CI/CD for your application using GitHub actions. Setup a GitHub action that, whenever you push to master, will automatically:

- Run your tests (ignore this step if you haven't learnt it yet) 
- Deploy your application to AWS

Regarding the deployment to AWS you can use `rsync` to copy the files to the server.
