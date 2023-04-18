# Attributes

## **Attributes**

An attribute, in the context of a relational model, represents a characteristic or property of an entity. Entities are the individual instances or objects that exist within a given table, while the attributes help to store and describe these entities in a layered and structured manner. 

For a better understanding of attributes, we can look at an example based on the table `students`:

```
students
---------------
student_id
student_name
birthdate
email_address
```

In this example, the `student_id`, `student_name`, `birthdate`, and `email_address` are the attributes of each student entity in the `students` table. These attributes help describe the specific characteristics and properties that are associated with each student.

### **Key Points about Attributes**

- Attributes are also known as fields or columns in other databases.
- Each attribute must have a data type, such as integer, character, boolean, etc.
- Attributes can be simple (atomic) or complex, the latter meaning that they can store multiple values.
- Each attribute have constraints, such as primary keys, unique keys, foreign keys, which can help enforce data integrity rules.
- Attributes can have default values or be automatically generated, such as timestamps or serial numbers, in specific scenarios.
- Attributes, in combination with entities, conform to the overall structure of the relational model, providing the blueprint for organizing, storing, and retrieving data in a PostgreSQL database.