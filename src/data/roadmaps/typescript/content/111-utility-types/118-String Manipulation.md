---

# **String Manipulation Types in TypeScript**

TypeScript provides several utility types for manipulating string literal types. These utilities allow for transforming string literals to different cases, making it easier to handle string transformations at the type level.

## **Types Overview**

### **Uppercase**

The `Uppercase` type converts each character in a string literal type to uppercase.

### **Lowercase**

The `Lowercase` type converts each character in a string literal type to lowercase.

### **Capitalize**

The `Capitalize` type converts the first character of a string literal type to uppercase.

### **Uncapitalize**

The `Uncapitalize` type converts the first character of a string literal type to lowercase.

## **Usage**

### **Uppercase**

Transforms all characters of a string literal type to uppercase.

**Example:**
```typescript
type Greeting = "hello";
type ShoutingGreeting = Uppercase<Greeting>; // "HELLO"
```

### **Lowercase**

Transforms all characters of a string literal type to lowercase.

**Example:**
```typescript
type Greeting = "HELLO";
type WhisperingGreeting = Lowercase<Greeting>; // "hello"
```

### **Capitalize**

Transforms only the first character of a string literal type to uppercase.

**Example:**
```typescript
type Greeting = "hello";
type FormalGreeting = Capitalize<Greeting>; // "Hello"
```

### **Uncapitalize**

Transforms only the first character of a string literal type to lowercase.

**Example:**
```typescript
type Greeting = "Hello";
type CasualGreeting = Uncapitalize<Greeting>; // "hello"
```

### **Advanced Examples**

#### **Combining String Manipulation Types**

You can combine these types to achieve more complex transformations.

**Example:**
```typescript
type Original = "heLLo WoRLd";
type Upper = Uppercase<Original>; // "HELLO WORLD"
type Lower = Lowercase<Original>; // "hello world"
type Capitalized = Capitalize<Lower>; // "Hello world"
type Uncapitalized = Uncapitalize<Upper>; // "hELLO WORLD"
```

#### **Using with Template Literals**

These types can also be used with template literals to transform parts of the string.

**Example:**
```typescript
type Template = `prefix-${Uppercase<"someString">}-suffix`; // "prefix-SOMESTRING-suffix"
```

### **Practical Application**

These types are particularly useful when you want to enforce or transform string formats at the type level, such as for constructing API endpoints, generating types from a set of known strings, or ensuring consistent naming conventions.

**Example:**
```typescript
type Route = "/api";
type UserEndpoint = `${Route}/users`;
type UserIdEndpoint = `${UserEndpoint}/${Uppercase<"id">}`; // "/api/users/ID"
```

### **Summary**

- **Uppercase**: Converts all characters in a string literal to uppercase.
- **Lowercase**: Converts all characters in a string literal to lowercase.
- **Capitalize**: Converts the first character of a string literal to uppercase.
- **Uncapitalize**: Converts the first character of a string literal to lowercase.

By understanding and utilizing these string manipulation types, developers can create more flexible and type-safe code, ensuring string literals conform to desired formats directly at the type level.

---
