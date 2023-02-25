# Rolling updates rollbacks
Rolling updates and rollbacks are important features of modern software development and deployment that allow for the seamless deployment and management of application updates.

## Rolling updates:

A rolling update is a deployment strategy that involves updating a service or application one instance at a time, without any downtime. This is done by gradually replacing instances of the application with updated instances, while the service remains available to users. Rolling updates are typically used for non-critical updates or feature enhancements, where the application can tolerate some downtime for updating.

Here are some key components of a rolling update:

* Update plan: A plan for updating the service or application, specifying the number of instances to be updated at a time and the order in which they should be updated.

* Verification: Each updated instance is verified before moving onto the next one, to ensure that the update was successful.

* Downtime: Rolling updates do not typically require any downtime, as the service or application remains available throughout the update process.

## Rollbacks:

A rollback is a process of reverting to a previous version of an application or service, typically done when an update has caused issues or errors. Rollbacks are important because they allow for quick recovery of services or applications without significant downtime or impact to end-users.

Here are some key components of a rollback:

* Rollback plan: A plan for reverting to the previous version of the application or service.

* Verification: The previous version of the application or service is verified to ensure that it is functioning correctly.

* Downtime: Rollbacks may require some downtime, depending on the complexity of the application or service and the nature of the update that caused the issues.

Rolling updates and rollbacks are important tools for modern software development and deployment, enabling developers to update and manage applications and services with minimal disruption to end-users.