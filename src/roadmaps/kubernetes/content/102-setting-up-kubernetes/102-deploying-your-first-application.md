# Deploying your first application
Deploying your first application, an nginx web server, on minikube can be a great way to learn about Kubernetes and get started with container orchestration. Here are the steps to deploy an nginx web server on minikube:

* Install minikube: First, you need to install minikube on your local machine. You can follow the instructions for your operating system on the minikube documentation.

* Start minikube: Once you have installed minikube, start it by running the command minikube start in your terminal.

* Deploy the nginx web server: Create a deployment file nginx-deployment.yaml with the following contents:

``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 1
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```
This file creates a Kubernetes deployment with one replica of an nginx container that listens on port 80.

* Deploy the application: Run the following command to deploy the nginx web server:

``` 
kubectl apply -f nginx-deployment.yaml
```
This command creates a deployment based on the contents of nginx-deployment.yaml.

*  Expose the deployment: Run the following command to create a service to expose the nginx web server deployment:

```
kubectl expose deployment nginx-deployment --type=NodePort --port=80
```
This command creates a service that exposes the nginx web server on a randomly assigned node port.

* Test the application: Get the IP address of the minikube cluster by running the command minikube ip. Then, open a web browser and navigate to the IP address followed by the node port assigned to the nginx service (e.g., http://<code>http://&lt;minikube-ip&gt;:&lt;node-port&gt;</code>).

Congratulations! You have now deployed an nginx web server on minikube using Kubernetes. You can further explore Kubernetes and try out more advanced features by deploying additional applications and services.

