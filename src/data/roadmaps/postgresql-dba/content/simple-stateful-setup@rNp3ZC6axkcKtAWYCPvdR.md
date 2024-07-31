# Simple Stateful Setup

Here are the key components and steps involved in setting up a simple stateful `PostgreSQL` deployment on `Kubernetes`:

- **Create a Storage Class**: Define a `StorageClass` resource in `Kubernetes`, specifying the type of storage to be used and the access mode (read-write, read-only, etc.).

- **Create a Persistent Volume Claim**: Define a `PersistentVolumeClaim` (PVC) to request a specific amount of storage from the storage class for your `PostgreSQL` database.

- **Create a ConfigMap**: Define a `ConfigMap` to store your database configuration settings (e.g., usernames, passwords, etc.), separate from your application code.

- **Create a Secret**: Store sensitive data (e.g., database passwords) securely in a `Secret` object. The `Secret` will be mounted as a volume in the pod and the environment variables will be set.

- **Create a StatefulSet**: Define a `StatefulSet` that manages the deployment of your `PostgreSQL` pods. Specify the container image, port, volumes (PVC and ConfigMap), and a startup script. It ensures the unique identifier for each pod and guarantees the order of pod creation/deletion.

Learn more from the following resources:

- [@article@How to Deploy Postgres to Kubernetes Cluster](https://www.digitalocean.com/community/tutorials/how-to-deploy-postgres-to-kubernetes-cluster)
- [@article@Deploy PostgreSQL on K8's](https://refine.dev/blog/postgres-on-kubernetes/)