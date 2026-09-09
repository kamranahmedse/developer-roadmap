# Cross-site Request Forgery

Cross-site Request Forgery is a security vulnerability that tricks a user's web browser into performing unwanted actions on a different website where the user is currently authenticated. An attacker uses this flaw to execute unauthorized commands by leveraging the browser’s automatic inclusion of session cookies with every request sent to a specific domain. When a victim visits a malicious site while logged into an application, the attacker’s hidden scripts send forged requests that the server interprets as legitimate user instructions. This process compromises user data and account integrity by bypassing the intended verification steps of an application.

Visit the following resources to learn more:

- [@official@Cross Site Request Forgery](https://angular.dev/best-practices/security#cross-site-request-forgery)
- [@official@HttpClientXsrfModule](https://angular.dev/api/common/http/HttpClientXsrfModule)
- [@article@Prevent Cross-Site Request Forgery (XSRF/CSRF) Attack](https://learn.microsoft.com/en-us/aspnet/core/security/anti-request-forgery?view=aspnetcore-9.0)
- [@video@Configure the CSRF Protection With Spring Security 6 and Angular](https://www.youtube.com/watch?v=tgjLsEmxcuY)