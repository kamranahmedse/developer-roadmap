# Prefer UUIDs

> Use UUIDs instead of auto-incrementing integers. UUIDs are globally unique, and are not sequential. They are also more difficult to guess than sequential integers.

Use of UUIDs over auto-incrementing IDs prevents attackers from guessing or iterating through resource IDs. UUIDs are randomly generated and contain 128 bits of entropy, making it practically impossible for attackers to guess them. In contrast, autoincrementing IDs can be easily predicted or iterated through, allowing attackers to access or manipulate resources they shouldn't have access to. Additionally, using UUIDs can help prevent information disclosure by hiding the order of resource creation or access.