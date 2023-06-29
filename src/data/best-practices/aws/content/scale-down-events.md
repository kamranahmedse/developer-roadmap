# Scale Down

> Scale down on INSUFFICIENT_DATA as well as ALARM.

For your scale-down action, make sure to trigger a scale-down event when there's no metric data, as well as when your trigger goes off. For example, if you have an app which usually has very low traffic, but experiences occasional spikes, you want to be sure that it scales down once the spike is over and the traffic stops. If there's no traffic, you'll get `INSUFFICIENT_DATA` instead of `ALARM` for your low traffic threshold and it won't trigger a scale-down action.
