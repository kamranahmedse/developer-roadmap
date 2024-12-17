# Availability in Numbers

Availability is often quantified by uptime (or downtime) as a percentage of time the service is available. Availability is generally measured in number of 9s--a service with 99.99% availability is described as having four 9s.

## 99.9% Availability - Three 9s:

```
Duration           | Acceptable downtime
-------------      | -------------
Downtime per year  | 8h 41min 38s
Downtime per month | 43m 28s
Downtime per week  | 10m 4.8s
Downtime per day   | 1m 26s
```

## 99.99% Availability - Four 9s

```
Duration           | Acceptable downtime
-------------      | -------------
Downtime per year  | 52min 9.8s
Downtime per month | 4m 21s
Downtime per week  | 1m 0.5s
Downtime per day   | 8.6s
```

## Availability in parallel vs in sequence

If a service consists of multiple components prone to failure, the service's overall availability depends on whether the components are in sequence or in parallel.

### In sequence

Overall availability decreases when two components with availability < 100% are in sequence:

```
Availability (Total) = Availability (Foo) * Availability (Bar)
```

If both `Foo` and `Bar` each had 99.9% availability, their total availability in sequence would be 99.8%.

### In parallel

Overall availability increases when two components with availability < 100% are in parallel:

```
Availability (Total) = 1 - (1 - Availability (Foo)) * (1 - Availability (Bar))
```

If both `Foo` and `Bar` each had 99.9% availability, their total availability in parallel would be 99.9999%.

To learn more, visit the following links:

- [@article@Availability in System Design](https://www.enjoyalgorithms.com/blog/availability-system-design-concept/)
- [@article@Uptime calculator: How much downtime corresponds to 99.9 % uptime](https://uptime.is/)
- [@opensource@Availability in numbers](https://github.com/maxculley/developer-roadmap.git)