# Services

Components shouldn't fetch or save data directly and shouldn't knowingly present fake data. They should focus on presenting data and delegate data access to a service. Service is where all the remote API calls exist to retrieve and provide data to components.

{% resources %}
  {% Blog "https://angular.io/tutorial/toh-pt4", "Adding Services in Angular" %}
  {% Blog "https://angular.io/tutorial/toh-pt6", "Get Data from Server" %}
{% endresources %}
