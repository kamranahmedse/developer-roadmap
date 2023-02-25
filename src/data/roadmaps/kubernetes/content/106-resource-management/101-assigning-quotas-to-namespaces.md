# Assigning quotas to namespaces
In Kubernetes, quotas can be assigned to namespaces to limit the amount of resources that can be consumed by the pods and containers within that namespace. Quotas can be used to prevent resource starvation and ensure fair resource allocation across namespaces.

Here's an example of how to assign a quota to a namespace in Kubernetes:

* Create a YAML file with the following contents:
```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: my-quota
spec:
  hard:
    requests.cpu: "1"
    requests.memory: 1Gi
    limits.cpu: "2"
    limits.memory: 2Gi
```
In the example above, we're creating a ResourceQuota object named my-quota. The hard field specifies the maximum amount of resources that can be consumed by the pods and containers in the namespace.

* Apply the YAML file to the namespace using the `kubectl apply` command:
```
kubectl apply -f my-quota.yaml -n my-namespace
```
In the example above, we're applying the `my-quota.yaml` file to the `my-namespace` namespace.

Once the quota is applied, Kubernetes will enforce the quota by preventing the creation of new pods or containers that would exceed the quota's limits. Existing pods and containers that exceed the quota's limits will continue to run, but new pods or containers cannot be created until the resource usage is reduced.

You can check the resource usage of a namespace using the `kubectl describe quota` command:

```
kubectl describe quota my-quota -n my-namespace
```
In the example above, we're checking the resource usage of the `my-quota` quota in the `my-namespace` namespace.

In conclusion, assigning quotas to namespaces is an important aspect of resource management in Kubernetes. It allows you to prevent resource starvation and ensure fair resource allocation across namespaces.