# Envoy

Originally created at Lyft, Envoy is a high-performance data plane designed for service mesh architectures. Lyft open sourced it and donated it to the CNCF, where it is now one of the CNCF’s graduated open source projects. Envoy is a self contained process that is designed to run alongside every application server. All of the Envoys form a transparent communication mesh in which each application sends and receives messages to and from localhost and is unaware of the network topology.

{% resources %}
  {% Official "https://www.envoyproxy.io/", "Envoy Website" %}
  {% Official "https://www.envoyproxy.io/docs/envoy/latest/start/start", "Envoy Documentation" %}
  {% Blog "https://www.envoyproxy.io/docs/envoy/latest/intro/what_is_envoy", "What is Envoy?" %}
{% endresources %}
