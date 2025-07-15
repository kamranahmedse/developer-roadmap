A transaction is a group of actions that should be treated as one. Either everything in the transaction succeeds, or nothing does. This helps keep your data accurate, especially when making multiple changes at once.

```sql
-- Basic transaction syntax
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE account_id = 123;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 456;

-- If both updates succeed
COMMIT;

-- If there's a problem
ROLLBACK;
```

Transactions follow ACID properties:

![ACID Properties](https://assets.roadmap.sh/guest/acid-properties-fau5z.png)

- **Atomicity**: All steps succeed or none at all.
- **Consistency**: The database stays valid before and after.
- **Isolation**: Transactions don't interfere with each other.
- **Durability**: Once committed, the changes are saved permanently.

If you're dealing with things like financial transfers or inventory updates, using transactions is a must. 