# Role based acccess control
Role-Based Access Control (RBAC) is a security mechanism in Kubernetes that allows you to control access to Kubernetes resources based on user roles and permissions. RBAC allows you to define roles and bind them to specific users or groups, giving them specific permissions to access or modify Kubernetes resources.

Here are the key components of RBAC in Kubernetes:

* Role: A role is a set of permissions that define what actions a user can perform on Kubernetes resources in a specific namespace.

* ClusterRole: A ClusterRole is similar to a role but applies to the entire Kubernetes cluster instead of a specific namespace.

* RoleBinding: A RoleBinding is a Kubernetes resource that binds a role to a user or group in a specific namespace.

* ClusterRoleBinding: A ClusterRoleBinding is similar to a RoleBinding but applies to the entire Kubernetes cluster instead of a specific namespace.

To create an RBAC role and binding in Kubernetes, you can create a YAML file that defines the role and binding, and then apply it to the Kubernetes cluster using the kubectl apply command. Here is an example YAML file that defines a role and binding:

```yaml
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: my-namespace
  name: my-role
rules:
- apiGroups: ["", "extensions", "apps"]
  resources: ["deployments", "replicasets", "pods"]
  verbs: ["get", "watch", "list"]

---

kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: my-role-binding
  namespace: my-namespace
subjects:
- kind: User
  name: my-user
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: my-role
  apiGroup: rbac.authorization.k8s.io
```
This YAML file creates a role named "my-role" that allows users to get, watch, and list deployments, replica sets, and pods in the "my-namespace" namespace. The RoleBinding then binds the "my-role" role to the user "my-user" in the same namespace.

RBAC is an important security mechanism in Kubernetes that allows you to control access to your Kubernetes resources and ensure that only authorized users can access and modify them.