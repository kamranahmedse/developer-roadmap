# Setting resource requests and limits
In Kubernetes, resource requests and limits are set in the pod's YAML file under the spec section. Here's an example of how to set resource requests and limits for a container:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: my-image
    resources:
      requests:
        cpu: "100m"
        memory: "128Mi"
      limits:
        cpu: "500m"
        memory: "512Mi"
```
In the example above, we're setting resource requests and limits for a container named my-container. The requests field specifies the minimum amount of resources required by the container, while the limits field specifies the maximum amount of resources the container can consume.

For CPU, resource requests and limits are specified in millicores (m), which is a thousandth of a CPU core. In the example above, the container has a CPU request of 100 millicores and a CPU limit of 500 millicores.

For memory, resource requests and limits are specified in bytes. However, you can use abbreviations such as Mi for mebibytes or Gi for gibibytes to make it easier to read. In the example above, the container has a memory request of 128 mebibytes and a memory limit of 512 mebibytes.

Once you've set the resource requests and limits in the pod's YAML file, Kubernetes will schedule the pod to a node that has enough resources available to satisfy the pod's requirements. If the container exceeds its resource limits, Kubernetes will terminate the container and try to restart it on another node.

In conclusion, setting resource requests and limits is an important aspect of resource management in Kubernetes. It allows you to ensure that your applications have the resources they need to run efficiently while preventing resource waste and potential application failures.