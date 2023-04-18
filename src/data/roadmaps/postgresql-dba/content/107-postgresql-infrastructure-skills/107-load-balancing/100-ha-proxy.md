# HAProxy

## HAProxy Load Balancer for PostgreSQL

In this section, we will discuss how to use HAProxy to load balance read queries and distribute them efficiently among multiple PostgreSQL read replica servers. HAProxy is a popular open-source load balancer and proxy server known for its high reliability, high-performance, and easy configuration.

### Key Concepts

1. **Load balancing**: Read load balancing involves distributing select queries among multiple read replicas to reduce the load on the primary database and improve overall system performance. Write queries always go to the primary server.

2. **HAProxy**: Stands for High Availability Proxy; it's a widely-used open-source software load balancer and proxy server to manage TCP and HTTP-based applications.

### Implementing HAProxy for PostgreSQL

To set up HAProxy, follow these steps:

1. **Install HAProxy**: Start by installing HAProxy on your load balancer server. For Ubuntu or Debian, you can use the following command:

   ```
   sudo apt-get install haproxy
   ```

2. **Configure HAProxy**: Create a new configuration file (e.g., `haproxy.cfg`) in the `/etc/haproxy` directory. Here's a sample configuration for PostgreSQL load balancing:

   ```ini
   global
       log /dev/log local0
       maxconn 4096
       user haproxy
       group haproxy
       daemon

   defaults
       log global
       mode tcp
       option tcplog
       timeout connect 5s
       timeout client 1m
       timeout server 1m
    
   frontend psql
       bind *:5000
       default_backend psql_backends
    
   backend psql_backends
       balance roundrobin
       option httpchk
       http-check expect status 200
       default-server inter 3s fall 3 rise 2

       server db_master 192.168.1.100:5432 check port 5433
       server db_replica1 192.168.1.101:5432 check port 5433
       server db_replica2 192.168.1.102:5432 check port 5433
   ```

   Replace IP addresses with your PostgreSQL master and replica servers.

3. **Configure health checks**: You can set up a health check script on each PostgreSQL server to ensure that HAProxy routes traffic only to healthy servers.

   Create a new file (e.g., `pg_health.sh`) in the `/usr/local/bin` directory:

   ```bash
   #!/bin/bash
   psql -U <user> -c "select pg_is_in_recovery();" \
       | grep -q -E 'f|false' && head -c 2000 /dev/zero | exit 0

   echo "health check failed" >&2
   exit 1
   ```

   Replace `<user>` with the appropriate PostgreSQL user. Give execute permissions to this script:

   ```
   chmod +x /usr/local/bin/pg_health.sh
   ```

4. **Add health check to PostgreSQL**: Add the following line to the end of `pg_hba.conf`:

   ```
   hostssl all <user> all cert map=<user> clientcert=1
   ```

   Replace `<user>` with your postgres username

5. **Reload and start HAProxy**: After configuring HAProxy and health checks, restart the HAProxy service:

   ```
   sudo service haproxy reload
   sudo service haproxy start
   ```

That's it! Clients can now connect to the load balancer's IP address on port 5000, and their read queries will be distributed among the PostgreSQL read replicas using a round-robin strategy.