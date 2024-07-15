# Splitting Large State

Splitting large Terraform states involves breaking down a monolithic state file into smaller, more manageable units. This approach is crucial for improving performance, reducing the risk of state corruption, and enabling parallel workflows in large-scale infrastructures. Strategies include organizing resources into separate Terraform workspaces or using distinct state files for different logical components or environments. The process often involves using `terraform state mv` to relocate resources between states or `terraform state rm` followed by `import` in the new configuration. Careful planning is essential to manage dependencies between split states. Benefits include faster apply times, reduced risk of concurrent modification conflicts, and the ability to grant more granular access control. 

See `Splitting State Files` in the `State` topic for more resources.
