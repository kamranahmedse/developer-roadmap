# Idempotency

Idempotency is a crucial concept in IaC. An idempotent operation produces the same result regardless of how many times it’s executed. In the context of IaC, this means that applying the same configuration multiple times should not change the end state of the system. The role of idempotency in IaC scripts is to ensure consistency and prevent unintended side effects. For example, if a script to create a virtual machine (VM) is run twice, it should not create two VMs. Instead, it should recognize that the VM already exists and take no action.

