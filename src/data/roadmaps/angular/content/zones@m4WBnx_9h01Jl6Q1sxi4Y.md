# Zones

Zone.js is a signaling mechanism that Angular uses to detect when an application state might have changed. 
It captures asynchronous operations like setTimeout, network requests, and event listeners. 
Angular schedules change detection based on signals from Zone.js.

Visit the following resources to learn more:

- [@official@Resolving zone pollution](https://angular.dev/best-practices/zone-pollution)
- [@official@Angular without ZoneJS (Zoneless)](https://angular.dev/guide/experimental/zoneless)
- [@official@NgZone - API](https://angular.dev/api/core/NgZone)
- [@video@WTF is "Zone.js" and is it making your app slow?](https://www.youtube.com/watch?v=lmrf_gPIOZU)