# Scheduling basics
In Kubernetes, scheduling refers to the process of assigning a pod to a node in the cluster. The Kubernetes scheduler evaluates various factors, such as resource requirements, node availability, and pod affinity/anti-affinity, to determine the best node for a pod.

Here's an example of how scheduling works in Kubernetes:

Let's say you have a three-node cluster and want to deploy a web application. You create a deployment YAML file with the following specifications:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
    spec:
      containers:
      - name: webapp-container
        image: mywebapp:v1
        ports:
        - containerPort: 80
```
The `replicas` field in the YAML file specifies that you want to create three replicas of the web application. The `selector` field specifies that all replicas should have the label `app: webapp`. The `template` field specifies the pod specification, including the container image and the container port.

When you apply this deployment YAML file, Kubernetes creates three identical pods and tries to schedule them onto the three nodes in the cluster. The scheduler evaluates the resource requirements and node availability to determine the best node for each pod.

Assuming all nodes have enough resources, the scheduler might assign the pods to the nodes as follows:

* Pod 1 is assigned to Node 1
* Pod 2 is assigned to Node 2
* Pod 3 is assigned to Node 3

If one of the nodes becomes unavailable or runs out of resources, the scheduler can reschedule the pods onto other nodes to ensure that they continue to run. The scheduler can also take into account node affinity/anti-affinity to ensure that pods are scheduled on the most appropriate nodes based on their labels and annotations.

Overall, scheduling is a critical component of Kubernetes that ensures that pods are assigned to the most appropriate nodes in the cluster based on various factors. This helps to optimize resource utilization and ensure that workloads are running efficiently.