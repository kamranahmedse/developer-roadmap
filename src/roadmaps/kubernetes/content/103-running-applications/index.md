# Running applications
To deploy an application on Kubernetes, there are a few basic components that you need to understand:

* Pod: A Pod is the smallest and simplest unit in the Kubernetes object model. It represents a single instance of a running process in a cluster. A Pod can contain one or more containers, which share the same network namespace and can communicate with each other using `localhost`.

* ReplicaSet: A ReplicaSet is responsible for ensuring that a specified number of replicas of a Pod are running at any given time. It monitors the state of the Pods and creates or deletes Pods as needed to maintain the desired number of replicas.

* Deployment: A Deployment provides declarative updates for Pods and ReplicaSets. It allows you to define a desired state for your application, and Kubernetes will automatically update the ReplicaSets and Pods to match that state. Deployments also support rolling updates and rollbacks, making it easy to update your application without downtime.

* Service: A Service provides network access to a set of Pods. It allows you to expose your application to the cluster or to the outside world, and provides load balancing and service discovery features.

* Ingress: An Ingress is an API object that provides external access to your services in a cluster. It enables the definition of rules for routing traffic to different services based on the incoming request's host, path, or other criteria.

These components work together to provide a scalable and reliable way to deploy applications on Kubernetes. By defining the desired state of your application using Deployments, you can ensure that your application is always running and up-to-date. Services and Ingresses allow you to expose your application to the network and provide access to it from outside the cluster.