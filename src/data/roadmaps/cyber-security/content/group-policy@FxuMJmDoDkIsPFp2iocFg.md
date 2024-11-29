# Group Policy

_Group Policy_ is a feature in Windows operating systems that enables administrators to define and manage configurations, settings, and security policies for various aspects of the users and devices in a network. This capability helps you to establish and maintain a consistent and secure environment, which is crucial for organizations of all sizes.

Group Policy works by maintaining a hierarchy of _Group Policy Objects_ (GPOs), which contain multiple policy settings. GPOs can be linked to different levels of the Active Directory (AD) structure, such as domain, site, and organizational unit (OU) levels. By linking GPOs to specific levels, you can create an environment in which different settings are applied to different groups of users and computers, depending on their location in the AD structure.

When a user logs in or a computer starts up, the relevant GPOs from the AD structure get evaluated to determine the final policy settings. GPOs are processed in a specific order — local, site, domain, and OUs, with the latter having the highest priority. This order ensures that you can have a baseline set of policies at the domain level, with more specific policies applied at the OU level, as needed.

Learn more from the following resources:

- [@official@Group Policy overview](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/hh831791(v=ws.11))
- [@video@Learn Windows Group Policy the easy way!](https://www.youtube.com/watch?v=rEhTzP-ScBo)
