# Recursive Types

Recursive types are types that reference themselves. They're used to describe structures that can contain other structures of the same type (like folders containing folders, or trees with branches).

## Why Use Recursive Types?

Some data has a repeating, nested structure:
- **File systems**: Folders can contain files and other folders
- **Trees**: A tree branch can have child branches
- **Linked lists**: Each node points to another node of the same type
- **JSON**: Objects can contain nested objects

Recursive types let you describe these patterns cleanly.

## How It Works

A recursive type references itself in its definition:

```typescript
type SelfReference = {
  value: string;
  child: SelfReference | null; // References itself
};
```

Read it as: "A node has a value and optionally points to another node like itself."

## Examples

### Linked List: Chain of Numbers

```typescript
type LinkedList<T> = {
  value: T;
  next: LinkedList<T> | null;
};

let list: LinkedList<number> = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: null, // End of list
    },
  },
};
```

### File System: Folders and Files

```typescript
type FileSystemNode = {
  name: string;
  isDirectory: boolean;
  children?: FileSystemNode[]; // A folder contains other nodes
};

const folder: FileSystemNode = {
  name: "Documents",
  isDirectory: true,
  children: [
    { name: "Resume.pdf", isDirectory: false },
    {
      name: "Projects",
      isDirectory: true,
      children: [
        { name: "Portfolio.html", isDirectory: false },
        { name: "BlogPost.md", isDirectory: false },
      ],
    },
  ],
};
```

### Tree Structure: Organization Chart

```typescript
type Employee = {
  name: string;
  role: string;
  subordinates: Employee[]; // Manager has employees under them
};

const company: Employee = {
  name: "CEO",
  role: "Chief Executive Officer",
  subordinates: [
    {
      name: "VP Engineering",
      role: "Vice President",
      subordinates: [
        { name: "Engineer A", role: "Senior Engineer", subordinates: [] },
        { name: "Engineer B", role: "Junior Engineer", subordinates: [] },
      ],
    },
    {
      name: "VP Marketing",
      role: "Vice President",
      subordinates: [],
    },
  ],
};
```

### Comments with Nested Replies

```typescript
type Comment = {
  id: number;
  text: string;
  author: string;
  replies: Comment[]; // Comments can have nested replies
};

const comment: Comment = {
  id: 1,
  text: "Great article!",
  author: "Alice",
  replies: [
    {
      id: 2,
      text: "Thanks!",
      author: "Bob",
      replies: [
        {
          id: 3,
          text: "You're welcome",
          author: "Alice",
          replies: [],
        },
      ],
    },
  ],
};
```

## Tips

- **Always have a base case**: Include a condition to stop recursion (like `null` or an empty array)
- **Use optional properties**: Often you'll use `?` to make the recursive part optional
- **Consider depth limits**: Deeply nested recursion can cause performance issues
- **Use generics**: `<T>` lets you make recursive types work with any data type

## Common Patterns

| Pattern | Use Case |
|---|---|
| `parent \| null` | Single chain (linked list) |
| `children: Type[]` | Multiple children (trees, graphs) |
| `[key: string]: Type` | Maps/dictionaries with nested values |

Learn more from the following links:

- [@official@Recursive Types in TypeScript](https://www.typescriptlang.org/play/3-7/types-and-code-flow/recursive-type-references.ts.html)
