# Kratos

Kratos is a microservice-oriented governance framework implemented by golang,
which offers convenient capabilities to help you quickly build a bulletproof application from scratch, such as:

 - The communication protocol is based on the HTTP/gRPC through the definition of Protobuf.
 - Abstract transport layer support: HTTP / gRPC.
 - Powerful middleware design, support: Tracing (OpenTelemetry), Metrics (Prometheus is default), Recovery and more.
 - Registry interface able to be connected with various other centralized registries through plug-ins.
 - The standard log interfaces ease the integration of the third-party log libs with logs collected through the Fluentd.
 - Automatically support the selection of the content encoding with Accept and Content-Type.
 - Multiple data sources are supported for configurations and dynamic configurations (use atomic operations).
 - In the protocol of HTTP/gRPC, use the uniform metadata transfer method.
 - You can define errors in protos and generate enums with protoc-gen-go.
 - You can define verification rules in Protobuf supported by the HTTP/gRPC service.
 - Swagger API is generated Automatically and embed Swagger UI endpoint can be started by adding Swagger plugin.

Visit the following resources to learn more:

- [GitHub Repository](https://github.com/go-kratos/kratos)
- [Getting started](https://go-kratos.dev/en/docs/getting-started/start)
