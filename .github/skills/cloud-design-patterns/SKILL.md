---
name: cloud-design-patterns
description: 'Cloud design patterns for distributed systems architecture covering 42 industry-standard patterns across reliability, performance, messaging, security, and deployment categories. Use when designing, reviewing, or implementing distributed system architectures.'
---

# Cloud Design Patterns

Architects design workloads by integrating platform services, functionality, and code to meet both functional and nonfunctional requirements. To design effective workloads, you must understand these requirements and select topologies and methodologies that address the challenges of your workload's constraints. Cloud design patterns provide solutions to many common challenges.

System design heavily relies on established design patterns. You can design infrastructure, code, and distributed systems by using a combination of these patterns. These patterns are crucial for building reliable, highly secure, cost-optimized, operationally efficient, and high-performing applications in the cloud.

The following cloud design patterns are technology-agnostic, which makes them suitable for any distributed system. You can apply these patterns across Azure, other cloud platforms, on-premises setups, and hybrid environments.

## How Cloud Design Patterns Enhance the Design Process

Cloud workloads are vulnerable to the fallacies of distributed computing, which are common but incorrect assumptions about how distributed systems operate. Examples of these fallacies include:

- The network is reliable.
- Latency is zero.
- Bandwidth is infinite.
- The network is secure.
- Topology doesn't change.
- There's one administrator.
- Component versioning is simple.
- Observability implementation can be delayed.

These misconceptions can result in flawed workload designs. Design patterns don't eliminate these misconceptions but help raise awareness, provide compensation strategies, and provide mitigations. Each cloud design pattern has trade-offs. Focus on why you should choose a specific pattern instead of how to implement it.

---

## How to Apply This Skill

When a user asks you to design, review, or implement a distributed system or cloud workload:

1. **Identify the problem category** — Is the concern about reliability, performance, messaging, security, deployment, or event-driven design?
2. **Select applicable patterns** — Choose the minimum set of patterns that address the constraints; do not apply patterns speculatively.
3. **Explain the trade-offs** — For each recommended pattern, explain *why* it fits and what trade-offs it introduces.
4. **Map to technology** — If the user's stack is known, map the pattern to concrete services or libraries.
5. **Warn about fallacies** — Proactively flag which distributed computing fallacies the user's current design may be relying on.

---

## Pattern Categories at a Glance

| Category | Patterns | Focus |
|---|---|---|
| Reliability & Resilience | 9 patterns | Fault tolerance, self-healing, graceful degradation |
| Performance | 10 patterns | Caching, scaling, load management, data optimization |
| Messaging & Integration | 7 patterns | Decoupling, event-driven communication, workflow coordination |
| Architecture & Design | 7 patterns | System boundaries, API gateways, migration strategies |
| Deployment & Operational | 5 patterns | Infrastructure management, geo-distribution, configuration |
| Security | 3 patterns | Identity, access control, content validation |
| Event-Driven Architecture | 1 pattern | Event sourcing and audit trails |

---

## Reliability & Resilience Patterns

| Pattern | Problem Solved | Key Trade-off |
|---|---|---|
| **Ambassador** | Offload cross-cutting network concerns (retry, logging, monitoring) from a service into a proxy | Adds latency; proxy becomes a dependency |
| **Bulkhead** | Isolate failures by partitioning resources so one consumer can't exhaust shared resources | Reduces utilization efficiency |
| **Circuit Breaker** | Prevent cascading failures by stopping calls to a failing dependency | Requires tuning thresholds; may cause false positives |
| **Compensating Transaction** | Undo work done by a series of steps when a later step fails | Complex to implement; eventual consistency only |
| **Retry** | Automatically re-attempt a failed operation with backoff | Can amplify load on a struggling service |
| **Health Endpoint Monitoring** | Expose an endpoint that external tools can probe to verify service health | Must not expose sensitive internals |
| **Leader Election** | Coordinate distributed nodes so only one performs a task at a time | Leader failure detection adds complexity |
| **Saga** | Manage long-running distributed transactions without two-phase commit | Eventual consistency; rollback logic is complex |
| **Sequential Convoy** | Process ordered messages from a partition without blocking unrelated partitions | Requires partitioning strategy; ordering scope is limited |

---

## Performance Patterns

| Pattern | Problem Solved | Key Trade-off |
|---|---|---|
| **Async Request-Reply** | Decouple slow backend processing from the HTTP response cycle | Client must poll or receive callbacks; added complexity |
| **Cache-Aside** | Reduce database load by loading data into cache on demand | Cache invalidation is hard; stale data risk |
| **CQRS** | Separate read and write models to optimize each independently | Eventual consistency between read and write sides |
| **Index Table** | Create secondary indexes over data stores that don't support them natively | Index maintenance adds write overhead |
| **Materialized View** | Precompute aggregated views to accelerate reads | Stale if not refreshed; storage cost |
| **Priority Queue** | Ensure high-priority work is processed before lower-priority work | Starvation risk for low-priority items |
| **Queue-Based Load Leveling** | Buffer bursts of requests to smooth load on a backend | Increases latency; requires durable queue |
| **Rate Limiting** | Protect a service from being overwhelmed by enforcing a max request rate | Legitimate traffic may be rejected |
| **Sharding** | Distribute data across partitions to scale horizontally | Cross-shard queries are complex; rebalancing is hard |
| **Throttling** | Degrade gracefully under overload rather than failing | Degraded experience for some users |

---

## Messaging & Integration Patterns

| Pattern | Problem Solved | Key Trade-off |
|---|---|---|
| **Choreography** | Coordinate services through events without a central orchestrator | Hard to trace overall workflow; debugging is complex |
| **Claim Check** | Send large payloads via external storage reference instead of in-message | Extra hop to fetch payload; storage dependency |
| **Competing Consumers** | Scale message processing by having multiple consumers read from the same queue | Message ordering is not guaranteed |
| **Messaging Bridge** | Connect two incompatible messaging systems | Bridge becomes a single point of failure |
| **Pipes and Filters** | Decompose complex processing into a sequence of discrete steps | Latency accumulates across stages |
| **Publisher-Subscriber** | Broadcast events to multiple consumers without tight coupling | Consumers may fall behind; back-pressure is tricky |
| **Scheduler Agent Supervisor** | Coordinate distributed tasks with monitoring and recovery | Complex state machine; difficult to test |

---

## Architecture & Design Patterns

| Pattern | Problem Solved | Key Trade-off |
|---|---|---|
| **Anti-Corruption Layer** | Translate between your domain model and a legacy or external system | Adds a translation layer that must be maintained |
| **Backends for Frontends** | Provide tailored APIs for different client types (mobile, web, partner) | More services to build and maintain |
| **Gateway Aggregation** | Combine multiple backend calls into a single response for the client | Gateway can become a bottleneck |
| **Gateway Offloading** | Move cross-cutting concerns (auth, SSL, logging) to the gateway | Gateway is a single point of failure if not HA |
| **Gateway Routing** | Route requests to the correct backend based on content or path | Routing logic can grow complex |
| **Sidecar** | Deploy supporting processes (proxies, log shippers) alongside the main service | Increases resource consumption per instance |
| **Strangler Fig** | Incrementally migrate a legacy system by routing traffic to new implementations | Requires a routing facade for the transition period |

---

## Deployment & Operational Patterns

| Pattern | Problem Solved | Key Trade-off |
|---|---|---|
| **Compute Resource Consolidation** | Reduce costs by co-locating multiple workloads on shared compute | Noisy-neighbor risk; blast radius expands |
| **Deployment Stamps** | Deploy isolated, independent copies of the stack per tenant or region | Operational overhead grows with stamp count |
| **External Configuration Store** | Manage configuration outside the deployment artifact | Config store availability affects service startup |
| **Geode** | Deploy backend nodes globally so users are served from the nearest node | Data consistency across nodes is challenging |
| **Static Content Hosting** | Serve static assets directly from a CDN or object store | Cache invalidation on deployments must be managed |

---

## Security Patterns

| Pattern | Problem Solved | Key Trade-off |
|---|---|---|
| **Federated Identity** | Delegate authentication to an external identity provider | Dependency on the identity provider's availability |
| **Quarantine** | Validate and scan external content before allowing it into the system | Adds latency to ingestion pipelines |
| **Valet Key** | Grant clients time-limited, scoped access to a resource without proxying data | Token theft grants direct access; expiry must be short |

---

## Event-Driven Architecture Patterns

| Pattern | Problem Solved | Key Trade-off |
|---|---|---|
| **Event Sourcing** | Store state as an immutable sequence of events instead of current values | Event store grows indefinitely; replaying is slow without snapshots |

---

## Pattern Selection Guide

**Start with the problem, not the pattern.**

| Symptom | Candidate Patterns |
|---|---|
| Service calls a flaky dependency | Circuit Breaker, Retry, Ambassador |
| One slow consumer blocks others | Bulkhead, Priority Queue, Queue-Based Load Leveling |
| Need audit trail / time-travel queries | Event Sourcing |
| Migrating a monolith incrementally | Strangler Fig, Anti-Corruption Layer |
| High read volume on a database | Cache-Aside, Materialized View, CQRS, Read Replicas (Sharding) |
| Multi-step distributed transaction | Saga, Compensating Transaction |
| Different API needs per client type | Backends for Frontends, Gateway Aggregation |
| Burst traffic patterns | Queue-Based Load Leveling, Throttling, Rate Limiting |
| Global low-latency requirements | Geode, Deployment Stamps, Static Content Hosting |
| Cross-cutting concerns (auth, TLS) | Gateway Offloading, Sidecar |

---

## External References

- [Cloud Design Patterns — Azure Architecture Center](https://learn.microsoft.com/azure/architecture/patterns/)
- [Azure Well-Architected Framework](https://learn.microsoft.com/azure/architecture/framework/)
