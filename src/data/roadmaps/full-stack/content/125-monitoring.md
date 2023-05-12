# Checkpoint

You should now implement monitoring and autorestarts for your application using monit. Regarding autorestarts, you can also use [pm2](https://pm2.keymetrics.io/).

Here are some of the monitors you should implement for the application.

- CPU Usage
- Memory Usage
- Disk Usage
- Network Usage
- Service Availability
- Process Availability

Monit comes with existing configurations for many services. You can find them in `/etc/monit/conf-available`. You can copy them (and modify if required) to `/etc/monit/conf-enabled` to enable them.
