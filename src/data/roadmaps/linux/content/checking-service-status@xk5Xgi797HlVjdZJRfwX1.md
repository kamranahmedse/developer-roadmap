# Checking Service Status

systemctl status service-name gives a real-time snapshot of a service: whether it's active, inactive, or failed; its process ID; recent log lines; and any error messages from the last run. For a quick boolean check, systemctl is-active and systemctl is-enabled return simple values suitable for use in scripts. The enabled/disabled state indicates whether the service is configured to start automatically at boot, separate from whether it's currently running.

Visit the following resources to learn more:

- [@article@Checking the Status of a Service Without Having an Exact Name](https://www.baeldung.com/linux/initialization-managers-service-status)