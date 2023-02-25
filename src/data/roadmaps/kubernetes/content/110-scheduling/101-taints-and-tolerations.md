# Taints and tolerations
Taints and tolerations are a Kubernetes feature that allows nodes to repel or tolerate pods based on specific attributes. Taints are a property that can be added to a node, and tolerations are added to pods. The combination of taints and tolerations allows administrators to control where pods are scheduled in a Kubernetes cluster.

Here's how it works:

* A taint is added to a node, specifying a key-value pair and an effect. The key-value pair represents a label or annotation, and the effect can be one of three values: NoSchedule, PreferNoSchedule, or NoExecute.
```
kubectl taint nodes node1 key=value:NoSchedule
```
In this example, a taint is added to node1 with the key "key" and value "value", and the effect is "NoSchedule". This means that any pod that does not have a matching toleration will not be scheduled on this node.

* A toleration is added to a pod, specifying the same key-value pair as the taint and an effect. The effect should match the effect of the taint.
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: nginx
  tolerations:
  - key: "key"
    operator: "Equal"
    value: "value"
    effect: "NoSchedule"
```
In this example, a toleration is added to the pod "my-pod" with the key "key", value "value", and effect "NoSchedule". This means that the pod can be scheduled on nodes that have a taint with the same key-value pair and effect.

* When the Kubernetes scheduler assigns pods to nodes, it takes into account the taints and tolerations. If a node has a taint that does not match the tolerations of a pod, the scheduler will not assign the pod to that node. However, if there is a node that has a matching taint, and the pod has a matching toleration, the pod can be scheduled on that node.

Taints and tolerations can be used for various purposes, such as isolating critical workloads on specific nodes or reserving nodes for specific purposes. They provide administrators with fine-grained control over the scheduling of pods in a Kubernetes cluster, allowing them to optimize resource utilization and ensure that workloads are running efficiently