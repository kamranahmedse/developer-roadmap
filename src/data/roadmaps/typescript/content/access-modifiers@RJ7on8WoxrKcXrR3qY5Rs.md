# Access Modifiers

Control who can access your class properties and methods using `public`, `private`, and `protected`.

## Why Use These?

Access modifiers act like locks on your class data. They prevent other code from accidentally breaking or changing things they shouldn't touch. This keeps your code safe and organized.

## The Three Types

### `public` — Everyone can access

This is the default. Anyone using your class can read and use these properties/methods.

```typescript
class Car {
  public brand: string = 'Tesla';
  
  public honk(): void {
    console.log('Beep beep!');
  }
}

const car = new Car();
console.log(car.brand);  // OK: 'Tesla'
car.honk();              // OK
```

### `private` — Only this class can access

These are locked away. Only methods inside the same class can use them.

```typescript
class BankAccount {
  public accountNumber: string;
  private pin: number;  // LOCKED - only BankAccount methods can access
  
  constructor(accountNumber: string, pin: number) {
    this.accountNumber = accountNumber;
    this.pin = pin;
  }
  
  withdraw(amount: number, enteredPin: number): void {
    if (enteredPin === this.pin) {
      console.log(`Withdrew $${amount}`);
    } else {
      console.log('Wrong PIN!');
    }
  }
}

const account = new BankAccount('123456', 1234);
console.log(account.pin);        // Error: Cannot access private property
account.withdraw(100, 1234);      // OK
```

### `protected` — Class and subclasses can access

Locked from outside, but subclasses (classes that extend this one) can use them.

```typescript
class Animal {
  public name: string;
  protected age: number;  // LOCKED from outside, but subclasses can use
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Dog extends Animal {
  celebrate(): void {
    // Can access protected property because Dog extends Animal
    console.log(`${this.name} is ${this.age} years old!`);
  }
}

const dog = new Dog('Buddy', 5);
dog.celebrate();           // OK
console.log(dog.age);      // Error: Cannot access protected property
```

## Quick Comparison

| Who Can Access | `public` | `private` | `protected` |
|---|---|---|---|
| Inside the class | ✅ | ✅ | ✅ |
| Outside the class | ✅ | ❌ | ❌ |
| In subclasses | ✅ | ❌ | ✅ |

## Common Mistakes to Avoid

- **Making everything public** — Only expose what others need to use; hide the rest
- **Forgetting `protected` exists** — Use it when subclasses need access
- **Thinking `private` is truly secret** — It only works in TypeScript; JavaScript still has access

Learn more from the following resources:

- [@official@TypeScript Access Modifiers](https://www.typescripttutorial.net/typescript-tutorial/typescript-access-modifiers/)
