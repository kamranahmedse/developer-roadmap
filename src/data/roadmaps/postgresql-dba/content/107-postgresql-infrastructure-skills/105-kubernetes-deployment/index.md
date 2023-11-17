# Kubernetes Deployment

Kubernetes is an open-source container orchestrator that automates the deployment, scaling, and management of containerized applications in a clustered environment. Kubernetes deployments are a higher-level abstraction of managing the applications' desired state, including the number of replicas and the application version. The main advantage of using Kubernetes is that it provides automated rollouts, easy scaling, and management of your applications.

## Kubernetes Deployment Components

A Kubernetes deployment consists of several key components:

- **Deployment Object** - Defines the desired state of the application, such as the number of replicas, the version of the application, and the environment.

- **ReplicaSet** - Ensures that the desired number of replicas of the application is always running.

- **Pod** - A group of one or more containers that share the same network and are deployed on the same machine.

## Deploying a PostgreSQL Application on Kubernetes

You can deploy a PostgreSQL application on Kubernetes by following these steps:

- **Create a Deployment YAML file** - This file will define the deployment specification of your PostgreSQL application. It should specify the PostgreSQL container image, the number of replicas, and any other required settings like environment variables, secrets, and volumes:

    ```
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: postgresql
    spec:
      replicas: 2
      selector:
        matchLabels:
          app: postgresql
      template:
        metadata:
          labels:
            app: postgresql
        spec:
          containers:
          - name: postgres
            image: postgres:latest
            env:
            - name: POSTGRES_DB
              value: mydb
            - name: POSTGRES_USER
              valueFrom:
                secretKeyRef:
                  name: postgres-secret
                  key: username
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: postgres-secret
                  key: password
            ports:
            - containerPort: 5432
              name: postgres
            volumeMounts:
            - name: postgres-data
              mountPath: /var/lib/postgresql/data
          volumes:
          - name: postgres-data
            persistentVolumeClaim:
              claimName: postgres-pvc
    ```

- **Create and apply the deployment in Kubernetes** - Run `kubectl apply -f deployment.yaml` to create the deployment in your Kubernetes cluster.

- **Expose the PostgreSQL service** - To access your PostgreSQL application from outside the Kubernetes cluster, you can expose it as a service using `kubectl expose` command or a YAML file.

- **Scale your deployment** - You can easily scale your PostgreSQL application by changing the number of replicas in the deployment file, then updating it using `kubectl apply -f deployment.yaml`.

By following these steps, you can successfully deploy and manage a PostgreSQL application using the Kubernetes deployment system.

- [Run PostgreSQL. The Kubernetes way](https://cloudnative-pg.io/)