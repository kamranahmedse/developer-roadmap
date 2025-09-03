# Push Notifications

Remote Push notification: This is called a remote notification because they are pushed from the remote server with the help of one of the push notification services.

The notification you get on your device is handled/sent by one of the two notification services: FCM (Firebase Cloud Messaging — Google product ) and APN (Apple Push notification — Apple product).

Backend can choose one of the following paths to send the notification:

1. Use FCM service to send notifications to both Android and IOS apps.
2. Use the FCM service to send notifications to the Android app and the APN service to send notifications to the IOS app.

Device Token: Every device is assigned a unique token by the push notification services. This token is used to uniquely identify devices for targeting notifications.





- https://medium.com/@varunkukade999/part-1-push-notifications-in-react-native-2024-db5f7200288f
- https://medium.com/@varunkukade999/part-2-push-notifications-in-react-native-2024-479ec2b87a89
