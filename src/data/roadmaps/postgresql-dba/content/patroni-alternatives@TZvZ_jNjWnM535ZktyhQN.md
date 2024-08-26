# Alternatives to Patroni for PostgreSQL Cluster Management

While Patroni is a popular choice for managing PostgreSQL clusters, there are several other tools and frameworks available that you might consider as alternatives to Patroni. Each of these has its unique set of features and benefits, and some may be better suited to your specific requirements or use-cases.

Stolon - Stolon is a cloud-native PostgreSQL manager that automatically ensures high availability and, if required, can seamlessly scale instances. It was developed by the team at Sorint.lab and is written in Go. Some of the main features that differentiate Stolon from other solutions are:

Pgpool-II - Pgpool-II is an advanced and powerful PostgreSQL management and load balancing solution, developed by the Pgpool Global Development Group. Pgpool-II not only provides high availability and connection pooling, but also offers a myriad of other features, such as:

Repmgr - Repmgr is an open-source replication management tool for PostgreSQL that has been fully integrated and supported by 2ndQuadrant. It simplifies administration and daily management, providing a robust and easy-to-use solution. The main features of Repmgr include:

PAF (PostgreSQL Automatic Failover) - PAF is an HA (high-availability) resource agent for the Pacemaker and Corosync cluster manager, designed for the PostgreSQL's built-in streaming replication. It was developed by the team at Dalibo and is quite lightweight compared to other alternatives. Key features of PAF include:

Learn more from the following resources:

- [@opensources@sorintlab/stolen](https://github.com/sorintlab/stolon)
- [@official@pgPool Website](https://www.pgpool.net/mediawiki/index.php/Main_Page)
- [@official@RepMgr Website](https://repmgr.org/)
- [@opensource@dalibo/PAF](https://github.com/dalibo/PAF)