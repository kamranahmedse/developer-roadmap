# Parallel Routes
Parallel routes let you render **multiple independent parts of a page simultaneously**.
Think of a **dashboard**:

* Notifications
* Tasks
* Profile

Instead of mixing them into one big `page.tsx`, each can be its own route, but still shown together in the same layout.

---

### How it works

Next.js uses **slots** for this. Slots are defined with an `@` symbol inside the `app/` folder:

```
app/
 └─ dashboard/
     ├─ layout.tsx
     ├─ @notifications/
     │   └─ page.tsx
     ├─ @tasks/
     │   └─ page.tsx
     └─ @profile/
         └─ page.tsx
```

In `layout.tsx`, you receive each slot as a prop:

```tsx
export default function DashboardLayout({
  children,
  notifications,
  tasks,
  profile,
}: {
  children: React.ReactNode
  notifications: React.ReactNode
  tasks: React.ReactNode
  profile: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <aside>{notifications}</aside>
      <section>{tasks}</section>
      <section>{profile}</section>
      <main>{children}</main>
    </div>
  )
}
```

---

### Why is this useful?

* **Dashboards** → each section loads separately.
* **Tabs** → swap out just one part of the page.
* **Independent loading states** → each slot can have its own `loading.tsx`.
                                                                    
[@official@Parallel Routes)](https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes)
