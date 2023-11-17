# Simple Stateful Setup

In this section, we will discuss the basics of setting up a simple stateful `PostgreSQL` deployment on `Kubernetes`. A stateful setup ensures that data is persistent across pod restarts and failures. `Kubernetes` manages stateful applications using `StatefulSets`, which provide guarantees about the ordering and uniqueness of pods.

## Overview
Here are the key components and steps involved in setting up a simple stateful `PostgreSQL` deployment on `Kubernetes`:

- **Create a Storage Class**: Define a `StorageClass` resource in `Kubernetes`, specifying the type of storage to be used and the access mode (read-write, read-only, etc.).

- **Create a Persistent Volume Claim**: Define a `PersistentVolumeClaim` (PVC) to request a specific amount of storage from the storage class for your `PostgreSQL` database.

- **Create a ConfigMap**: Define a `ConfigMap` to store your database configuration settings (e.g., usernames, passwords, etc.), separate from your application code.

- **Create a Secret**: Store sensitive data (e.g., database passwords) securely in a `Secret` object. The `Secret` will be mounted as a volume in the pod and the environment variables will be set.

- **Create a StatefulSet**: Define a `StatefulSet` that manages the deployment of your `PostgreSQL` pods. Specify the container image, port, volumes (PVC and ConfigMap), and a startup script. It ensures the unique identifier for each pod and guarantees the order of pod creation/deletion.

## Step by Step Guide

- **Storage Class**:
   Create a YAML file for the `StorageClass` resource (e.g., `postgres-storage-class.yaml`):
   ```yaml
   apiVersion: storage.k8s.io/v1
   kind: StorageClass
   metadata:
     name: postgres-storage
   provisioner: kubernetes.io/gce-pd
   parameters:
     type: pd-standard
   ```
   Apply the file with `kubectl`: `kubectl apply -f postgres-storage-class.yaml`

- **Persistent Volume Claim**:
   Create a YAML file for the `PersistentVolumeClaim` resource (e.g., `postgres-pvc.yaml`):
   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: postgres-pvc
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 10Gi
     storageClassName: postgres-storage
   ```
   Apply the file with `kubectl`: `kubectl apply -f postgres-pvc.yaml`

- **ConfigMap**:
   Create a YAML file for the `ConfigMap` resource (e.g., `postgres-configmap.yaml`):
   ```yaml
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: postgres-config
   data:
     POSTGRES_DB: mydatabase
     POSTGRES_USER: myuser
   ```
   Apply the file with `kubectl`: `kubectl apply -f postgres-configmap.yaml`

- **Secret**:
   Create a YAML file for the `Secret` resource (e.g., `postgres-secret.yaml`):
   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: postgres-secret
   type: Opaque
   data:
     POSTGRES_PASSWORD: cG9zdGdyZXNfcGFzc3dvcmQ=  # Base64 encoded value of the actual password
   ```
   Apply the file with `kubectl`: `kubectl apply -f postgres-secret.yaml`

- **StatefulSet**:
   Create a YAML file for the `StatefulSet` resource (e.g., `postgres-statefulset.yaml`):
   ```yaml
   apiVersion: apps/v1
   kind: StatefulSet
   metadata:
     name: postgres
   spec:
     serviceName: "postgres"
     replicas: 1
     selector:
       matchLabels:
         app: postgres
     template:
       metadata:
         labels:
           app: postgres
       spec:
         containers:
         - name: postgres
           image: postgres:11
           ports:
           - containerPort: 5432
           env:
             - name: POSTGRES_DB
               valueFrom:
                 configMapKeyRef:
                   name: postgres-config
                   key: POSTGRES_DB
             - name: POSTGRES_USER
               valueFrom:
                 configMapKeyRef:
                   name: postgres-config
                   key: POSTGRES_USER
             - name: POSTGRES_PASSWORD
               valueFrom:
                 secretKeyRef:
                   name: postgres-secret
                   key: POSTGRES_PASSWORD
           volumeMounts:
           - name: postgres-data
             mountPath: /var/lib/postgresql/data
         volumes:
         - name: postgres-data
           persistentVolumeClaim:
             claimName: postgres-pvc
   ```
   Apply the file with `kubectl`: `kubectl apply -f postgres-statefulset.yaml`

Once all components have been created, `Kubernetes` will deploy a PostgreSQL stateful set with a persistent volume attached to the PostgreSQL pod, allowing the database to maintain its state.

That's it! You now have a basic understanding of how to set up a simple stateful `PostgreSQL` deployment on `Kubernetes`. You can build on this foundation to create more complex deployments with multiple replicas, load balancing, and high availability.