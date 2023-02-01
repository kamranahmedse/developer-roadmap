# Omit

Omit constructs a type by picking all properties from Type and then removing Keys (string literal or union of string literals).


    ```
    interface Todo {
    title: string;
    description: string;
    completed: boolean;
    createdAt: number;
    }
    
    type TodoPreview = Omit<Todo, "description">;
    
    const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
    createdAt: 1615544252770,
    };
    
    todo;
    
    const todo: TodoPreview
    
    type TodoInfo = Omit<Todo, "completed" | "createdAt">;
    
    const todoInfo: TodoInfo = {
    title: "Pick up kids",
    description: "Kindergarten closes at 5pm",
    };
    
    todoInfo;
    
    const todoInfo: TodoInfo
    ```

Learn more from the following links:

- [Omit<Type, Keys>](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)