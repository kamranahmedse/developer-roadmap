# Topology spread constraints
Topology spread constraints are a feature in Kubernetes that allow users to specify how pods are distributed across different failure domains, such as nodes or racks. This helps to improve the resiliency and availability of applications by ensuring that all replicas of a pod are not scheduled on the same node or in the same availability zone.

Here's how topology spread constraints work:

* Define the topology key: A topology key is a label or annotation that identifies the failure domain that should be considered when distributing pods. For example, you might use the `kubernetes.io/hostname` label to identify nodes or the `failure-domain.beta.kubernetes.io/zone` annotation to identify availability zones.

* Define the topology spread constraint: A topology spread constraint is a set of rules that specify how pods should be distributed across different failure domains. You can use operators such as `Equals`, `NotIn`, and `Exists` to define the rules.

Here's an example of a topology spread constraint that ensures that no more than two replicas of a pod are scheduled on nodes with the same `kubernetes.io/hostname` label:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
spec:
  replicas: 5
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-container
        image: my-image
      topologySpreadConstraints:
      - maxSkew: 1
        topologyKey: "kubernetes.io/hostname"
        whenUnsatisfiable: ScheduleAnyway
        labelSelector:
          matchExpressions:
          - key: "app"
            operator: "In"
            values:
            - "my-app"
```
In this example, the `topologySpreadConstraints` field is added to the pod specification with a single constraint. The `maxSkew` field specifies that the difference in the number of replicas across any two nodes with the same `kubernetes.io/hostname` label should be no more than 1. The `topologyKey` field specifies the key that identifies the failure domain. The `whenUnsatisfiable` field specifies what to do if the constraint cannot be satisfied, and the `labelSelector` field specifies the labels used to select the pods that should be constrained.

By using topology spread constraints, you can ensure that your pods are distributed across different failure domains, improving the resilience and availability of your applications.