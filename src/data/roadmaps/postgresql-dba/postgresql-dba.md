---
jsonUrl: '/jsons/roadmaps/postgresql-dba.json'
pdfUrl: '/pdfs/roadmaps/postgresql-dba.pdf'
renderer: 'editor'
order: 5
briefTitle: 'PostgreSQL'
briefDescription: 'Step by step guide to become a PostgreSQL DBA in 2024'
title: 'PostgreSQL DBA'
description: 'Step by step guide to becoming a modern PostgreSQL DB Administrator in 2024'
hasTopics: true
dimensions:
  width: 969
  height: 3675
seo:
  title: 'DBA Roadmap: Learn to become a database administrator with PostgreSQL'
  description: 'Community driven, articles, resources, guides, interview questions, quizzes for DevOps. Learn to become a modern DevOps engineer by following the steps, skills, resources and guides listed in this roadmap.'
  keywords:
    - 'guide to becoming a database administrator'
    - 'guide to becoming a DBA'
    - 'dba roadmap'
    - 'db administrator roadmap'
    - 'database administrator roadmap'
    - 'postgresql roadmap'
    - 'dba skills'
    - 'db administrator skills'
    - 'become dba'
    - 'postgresql skills'
    - 'modern dba skills'
    - 'dba skills test'
    - 'skills for dba'
    - 'skills for database administrator'
    - 'learn dba'
    - 'what is dba'
    - 'database administrator quiz'
    - 'dba interview questions'
relatedRoadmaps:
  - 'mongodb'
  - 'backend'
  - 'devops'
sitemap:
  priority: 1
  changefreq: 'monthly'
tags:
  - 'roadmap'
  - 'main-sitemap'
  - 'skill-roadmap'
---
The intent of this guide is to give you an idea about the DBA landscape and to help guide your learning if you are confused. The roadmap is highly opinionated — neither, knowing everything listed in the roadmap, nor the order of items given in the roadmap is required to be followed in order to be a DBA.

## Learn basic RDBMS terms and concepts

Get basic understanding of Postgres key terms and basic RDBMS concepts.

- **Object model**: data types, columns, rows, tables, schemas, databases, queries.
- **Relational model**: domains, attributes, tuples, relations, constraints, NULL.
- **Databases high-level concepts**: ACID, MVCC, transactions, write-ahead log, query processing.
- **Links**:
  - [Postgres Glossary](https://www.postgresql.org/docs/13/glossary.html)
  - SQL and Relational Theory - Christopher J. Date, 2009
  - Database Design and Relational Theory - Christopher J. Date, 2012

## Learn how to install and run PostgreSQL

Get practical skills of how to set up and run Postgres to get a working environment for further learning.

- Using package managers (APT, YUM, etc.)
- Using `docker`.
- Managing Postgres service using `systemd` (start, stop, restart, reload).
- Managing Postgres service using `pg_ctl`, or OS-specific tools (like `pg_ctlcluster`).
- Connect to Postgres using `psql`.
- Deploy database service in cloud environment (AWS, GCE, Azure, Heroku, DigitalOcean, etc...).
- **Links**:
  - [Official download and install instructions](https://www.postgresql.org/download/)
  - [Official Docker images](https://hub.docker.com/_/postgres)

## Learn SQL concepts

Get practical skills of how to create and manipulate database objects and how to execute queries using `psql` client.

- Understand basic data types.
- **DML queries**: querying data, modifying data, filtering data, joining tables.
  - **Advanced topics**: transactions, CTE, subqueries, lateral join, grouping, set operations.
- **DDL queries**: managing tables and schemas (create, alter, drop).
- Import and export data using `COPY`.
- **Links**:
  - [DB Fiddle](https://www.db-fiddle.com/)
  - [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
  - [PostgreSQL SQL Getting Started](https://www.postgresql.org/docs/current/tutorial-sql.html)
  - [The SQL Language](https://www.postgresql.org/docs/current/sql.html)

## Learn how to configure Postgres

Get understanding of the main aspects of how Postgres could be configured. Deep understanding of Postgres internals is not yet necessary here.

- postgresql.conf:
  - Resources usage
  - Write-ahead Log
  - Checkpoints and Background Writer
  - Cost-based vacuum and auto-vacuum
  - Replication
  - Query planner
  - Reporting, logging and statistics
  - Adding extra extensions
  - ...keep exploring other configuration options
- **Links**:
  - [Postgresqlco.nf](http://postgresqlco.nf/)

## Learn Postgres security concepts

Get understanding about basic security concepts and common ways of how to deploy secure configurations.

- Authentication models, roles, pg_hba.conf, SSL settings.
- **Objects privileges**: grant/revoke, default privileges.
- **Advanced topics** - row-level security, selinux.
- **Links**:
  - [Client authentication](https://www.postgresql.org/docs/current/client-authentication.html)
  - [Roles and users managements](https://www.postgresql.org/docs/current/user-manag.html)

## Develop infrastructure DBA skills

Get practical skills of how to deploy, extend, maintain and support Postgres installations and 3rd-party Postgres ecosystem software.

- **Replication**: streaming replication, logical replication
- **Backup/recovery tools**:
  - Built-in: `pg_dump`, `pg_dumpall`, `pg_restore`, `pg_basebackup`
  - 3rd-party: `barman`, `pgbackrest`, `pg_probackup`, `WAL-G`
  - Backup validation procedures
- **Upgrading procedures**
  - Minor and major upgrades using `pg_upgrade`
  - Upgrades using logical replication
- **Connection pooling**:
  - `Pgbouncer`
  - Alternatives: `Pgpool-II`, `Odyssey`, `Pgagroal`
- **Infrastructure monitoring**: `Prometheus`, `Zabbix`, other favourite monitoring solution
- **High availability and cluster management tools**:
  - `Patroni`
  - **Alternatives**: `Repmgr`, `Stolon`, `pg_auto_failover`, `PAF`
- **Applications Load Balancing and Service Discovery**: `Haproxy`, `Keepalived`, `Consul`, `Etcd`
- **Deploy Postgres on `Kubernetes`**: Simple `StatefulSet` setup, `HELM`, operators
- Resource usage and provisioning, capacity planning

## Learn how to automate routines

Get practical skills, learn automation tools and automate existing routine tasks.

- Automation using shell scripts or any other favourite language (`Bash`, `Python`, `Perl`, etc)
- Configuration management: `Ansible`, `Salt`, `Chef`, `Puppet`

## Develop application DBA skills

Learn theory and get practical skills of how applications should work with Postgres

- **Migrations**:
  - practical patterns and antipatterns
  - tools: `liquibase`, `sqitch`, `Bytebase`, language-specific tools
- Data import/export, bulk loading and processing
- **Queues**:
  - practical patterns and anti-patterns
  - `Skytools PGQ`
- Data partitioning and sharding patterns.
- Database normalization and normal forms.
- Books:
  - The Art of PostgreSQL - Dimitri Fontaine, 2020

## Learn Postgres advanced topics

Here is important to continuously extend and develop existing knowledge about Postgres.

- **Low level internals**:
  - Processes and memory architecture
  - Vacuum processing
  - Buffer management
  - Lock management
  - [Physical storage and file layout](https://www.postgresql.org/docs/current/storage.html)
  - [System catalog](https://www.postgresql.org/docs/current/catalogs.html)
- **Fine-grained tuning**:
  - Per-user, per-database settings
  - [Storage parameters](https://www.postgresql.org/docs/current/sql-createtable.html#SQL-CREATETABLE-STORAGE-PARAMETERS)
  - Workload-dependant tuning: OLTP, OLAP, HTAP
- **Advanced SQL topics**:
  - PL/pgSQL, procedures and functions, triggers
  - Aggregate and window functions
  - Recursive CTE
- **Links**:
  - [The Internals of PostgreSQL](http://www.interdb.jp/pg/index.html) for database administrators and system developers
  - [PL/pgSQL Guide](https://www.postgresql.org/docs/current/plpgsql.html)

## Learn Postgres troubleshooting techniques

Get basic understanding about troubleshooting tools and get practical skills of how to detect and resolve problems.

- **Operating system tools**
  - `top` (`htop`, `atop`)
  - `sysstat`
  - `iotop`
- **Postgres system views**
  - `pg_stat_activity`
  - `pg_stat_statements`
- **Postgres tools**
  - `pgcenter` - _personal recommendation_
- **Query analyzing**:
  - [EXPLAIN](https://www.postgresql.org/docs/current/sql-explain.html)
  - [Depesz](https://explain.depesz.com/) online EXPLAIN visualization tool
  - [PEV](https://tatiyants.com/pev/#/plans) online EXPLAIN visualization tool
  - [Tensor](https://explain.tensor.ru/) online EXPLAIN visualization tool, RU language only
- **Log analyzing**:
  - `pgBadger`
  - Ad-hoc analyzing using `grep`, `awk`, `sed`, etc.
- **External tracing/profiling tools**: `gdb`, `strace`, `perf-tools`, `ebpf`, core dumps
- **Troubleshooting methods**: USE, RED, Golden signals
- **Links**:
  - [Linux Performance](http://www.brendangregg.com/linuxperf.html) by Brendan Gregg
  - [USE Method](http://www.brendangregg.com/usemethod.html)

## Learn SQL optimization techniques

Get understanding and practical skills of how to optimize SQL queries.

- **Indexes, and their use cases**: B-tree, Hash, GiST, SP-GiST, GIN, BRIN
- SQL queries patterns and anti-patterns
- SQL schema design patterns and anti-patterns
- **Links**:
  - [Use the Index, Luke](https://use-the-index-luke.com/) - a Guide to Database Performance for Developers
- **Books**:
  - SQL Antipatterns: Avoiding the Pitfalls of Database Programming - Bill Karwin, 2010

## Develop architect skills

Get deeper understanding of Postgres use cases and where Postgres is suitable and where is not.

- **Postgres forks and extensions**: `Greenplum`, `Timescaledb`, `Citus`, `Postgres-XL`, `PostGIS` etc.
- RDBMS in general, benefits and limitations
- Differences between Postgres and other RDBMS and NoSQL databases

## Develop Postgres hacker skills

Get involved to Postgres community and contribute to Postgres; be a useful member of Postgres, and the open source community; use personal experience to help other people.

- Daily reading and answering in [mailing lists](https://www.postgresql.org/list/)
  - pgsql-general
  - pgsql-admin
  - pgsql-performance
  - pgsql-hackers
  - pgsql-bugs
- Reviewing patches
- Writing patches, attending in [Commitfests](https://commitfest.postgresql.org/)