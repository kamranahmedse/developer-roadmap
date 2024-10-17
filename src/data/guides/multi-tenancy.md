---
title: 'Multi-Tenancy in Laravel'
description: 'A guide to implementing multi-tenancy in Laravel using the Tenancy for Laravel package, focusing on multi-database tenancy and domain identification.'
authorId: 'sritharansk'
seo:
  title: 'Multi Tenancy in Laravel - roadmap.sh'
  description: 'Learn how to implement multi-tenancy in Laravel using the Tenancy for Laravel package with multi-database tenancy and domain identification.'
isNew: true
type: 'textual'
date: 2024-10-17
sitemap:
  priority: 0.7
  changefreq: 'weekly'
tags:
  - 'guide'
  - 'laravel'
  - 'multi-tenancy'
  - 'tenancy-for-laravel'
---

Laravel's flexibility and power make it an excellent choice for building multi-tenant applications. By using **Tenancy for Laravel**, you can create scalable applications where multiple tenants (users or organizations) share the same codebase but have their own databases, ensuring data isolation. In this guide, we'll walk through the process of setting up multi-tenancy in Laravel.

We will cover the following topics:

- [What is Multi-Tenancy?](#what-is-multi-tenancy)
- [Installation](#installation)
- [Creating a tenant model](#creating-tenants)
- [Comparison of Multi-Tenancy Packages](#comparison-of-multi-tenancy-packages)

## What is Multi-Tenancy?

Multi-tenancy is an architecture in which a single instance of a software application serves multiple tenants (users, clients, or organizations).
Multi-tenancy is the ability to provide your service to multiple users (tenants) from a single hosted instance of the application. This is contrasted with deploying the application separately for each user.

![Comparison](/guides/multi-tenancy/multi-tenancy-comparison.png)

You may find this talk insightful: https://multitenantlaravel.com/. Simply going through the slides will give you 80% of the value of the talk in under five minutes.
In a multi-tenant setup:

- Each tenant's data is isolated, ensuring security.
- The same codebase is used for all tenants, reducing code duplication.
- Tenants can have their own databases or share the same database with tenant-specific tables.

**Advantages**:

- Efficient resource management.
- Easier maintenance and scalability.
- Better data isolation and security.

## Installation

First, require the package using composer:

```php
composer require stancl/tenancy
```

Then, run the `tenancy:install` command:

```php
php artisan tenancy:install
```

This will create a few files: migrations, config file, route file and a service provider.

Let's run the migrations:

```php
php artisan migrate
```

Register the service provider in `bootstrap/providers.php`:

```php
return [
    App\Providers\AppServiceProvider::class,
    App\Providers\TenancyServiceProvider::class, // <-- here
];
```

## Creating a tenant model

Now you need to create a Tenant model. The package comes with a default Tenant model that has many features, but it attempts to be mostly unopinionated and as such, we need to create a custom model to use domains & databases. Create the file `app/Models/Tenant.php` like this:

```php
<?php

namespace App\Models;

use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasDatabase, HasDomains;
}
```

_Please note: if you have the models anywhere else, you should adjust the code and commands of this tutorial accordingly._

Now we need to tell the package to use this custom model. Open the `config/tenancy.php` file and modify the line below:

```php
'tenant_model' => \App\Models\Tenant::class,
```

## Events

The defaults will work out of the box here, but a short explanation will be useful. The `TenancyServiceProvider` file in your `app/Providers` directory maps tenancy events to listeners. By default, when a tenant is created, it runs a `JobPipeline` (a smart thing that's part of this package) which makes sure that the `CreateDatabase`, `MigrateDatabase` and optionally other jobs (e.g. `SeedDatabase`) are ran sequentially.

In other words, it creates & migrates the tenant's database after he's created — and it does this in the correct order, because normal event-listener mapping would execute the listeners in some stupid order that would result in things like the database being migrated before it's created, or seeded before it's migrated.

## Central routes

We'll make a small change to your existing route files. Specifically, we'll make sure that central routes are registered on central domains only:

```php
// routes/web.php, api.php or any other central route files you have

foreach (config('tenancy.central_domains') as $domain) {
    Route::domain($domain)->group(function () {
        // your actual routes
    });
}
```

Alternatively, to keep your route files more clean, you can use [this approach](https://github.com/archtechx/tenancy/pull/1180#issuecomment-2006098346) to register all of your routes in the `using` callback of the Application Builder.

## Central domains

Now we need to actually specify the central domains. A central domain is a domain that serves your "central app" content, e.g. the landing page where tenants sign up. Open the `config/tenancy.php` file and add them in:

```php
'central_domains' => [
    'saas.test', // Add the ones that you use. I use this one with Laravel Valet.
],
```

If you're using Laravel Sail, no changes are needed, default values are good to go:

```php
'central_domains' => [
    '127.0.0.1',
    'localhost',
],
```

## Tenant routes

Your tenant routes will look like this by default:

```php
Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->group(function () {
    Route::get('/', function () {
        return 'This is your multi-tenant application. The id of the current tenant is ' . tenant('id');
    });
});
```

These routes will only be accessible on tenant (non-central) domains — the `PreventAccessFromCentralDomains` middleware enforces that.

Let's make a small change to dump all the users in the database, so that we can actually see multi-tenancy working. Open the file `routes/tenant.php` and apply the modification below:

```php
Route::get('/', function () {
    dd(\App\Models\User::all());
    return 'This is your multi-tenant application. The id of the current tenant is ' . tenant('id');
});
```

## Migrations

To have users in tenant databases, let's move the `users` table migration (the file `database/migrations/0001_01_01_000000_create_users_table.php` or similar) to `database/migrations/tenant`. This will prevent the table from being created in the central database, and it will be instead created in the tenant database when a tenant is created — thanks to our event setup. If you have any other migrations that are necessary for your application, move those migrations as well.

## Creating tenants

For testing purposes, we'll create a tenant in `tinker` — no need to waste time creating controllers and views for now.

```php
$ php artisan tinker
>>> $tenant1 = App\Models\Tenant::create(['id' => 'foo']);
>>> $tenant1->domains()->create(['domain' => 'foo.localhost']);
>>>
>>> $tenant2 = App\Models\Tenant::create(['id' => 'bar']);
>>> $tenant2->domains()->create(['domain' => 'bar.localhost']);
```

Now we'll create a user inside each tenant's database:

```php
App\Models\Tenant::all()->runForEach(function () {
    App\Models\User::factory()->create();
});
```

## Trying it out

Now we visit `foo.localhost` in our browser, replace `localhost` with one of the values of `central_domains` in the file `config/tenancy.php` as modified previously. We should see a dump of the users table where we see some user. If we visit `bar.localhost`, we should see a different user.

## Comparison of Multi-Tenancy Packages

When deciding on the right multi-tenancy package for Laravel, it's important to consider the level of control, features, and ease of use each package provides. Below is a comparison of the most popular multi-tenancy packages: `hyn/multi-tenancy`, `tenancy/tenancy`, `spatie/laravel-multitenancy`, and `stancl/tenancy`.

### hyn/multi-tenancy

This package provides the necessary tooling for manually adding multi-tenancy to your application. It offers traits, classes for creating tenant databases, and other utilities. However, there are significant drawbacks:

- **Not actively maintained**: No new features have been added in over a year.
- **Difficult to test**: Many developers have reported that testing is very challenging, making the package fragile.

**Feedback from the community**:

- "I can't run any tests in Hyn and had some queuing problems."
- "Tests are extremely fragile, and I’m hesitant to modify anything for fear of breaking everything."

While this package was useful for manual multi-tenancy implementations, its lack of updates and fragile testing environment make it less favorable in today's Laravel ecosystem.

### tenancy/tenancy

This package serves as a framework for building your own multi-tenancy logic. It provides a flexible foundation by offering events and tools for custom implementations.

- **Highly flexible**: Great for those who want to fully customize their multi-tenancy logic.
- **Documentation is sparse**: The lack of detailed documentation makes it difficult to implement for most users.

**When to use it**:

- If you want to build an entirely custom multi-tenancy system and don't mind crafting everything yourself, this package could be a good fit.
- Not ideal for developers looking for a quick and feature-rich setup.

### spatie/laravel-multitenancy

A simple, straightforward package for implementing multi-tenancy. It is very similar to `stancl/tenancy v2`, but with fewer features.

- **Simple and minimal**: Offers basic multi-tenancy functionality with fewer out-of-the-box features.
- **Better integration with Eloquent**: Makes tasks like integrating Laravel Cashier easier, but with the release of `stancl/tenancy v3`, this is no longer a distinct advantage.

**When to use it**:

- If you're building a very simple application without complex requirements, this package might be sufficient.
- Not suitable for applications that need advanced features or scalability.

### stancl/tenancy

In my (biased) opinion, this package is the best option for the majority of applications. It combines flexibility with an extensive list of out-of-the-box features.

- **Most feature-rich**: Offers multi-database tenancy, single-database tenancy, event systems, and much more.
- **Automatic tenancy management**: Handles switching between tenant databases and resources like Redis, cache, and filesystem roots seamlessly.
- **High testability**: Designed with testing in mind, allowing developers to easily write reliable tests.

#### Key Features:

- Multi-database and single-database tenancy support.
- CLI commands for managing tenants (`migrate`, `migrate:fresh`, `seed`, etc.).
- Automatic tenancy with bootstrappers for database connections, cache, queues, and more.
- Supports tenant identification via domains, subdomains, paths, or request data.
- Integrates with popular Laravel packages like `spatie/laravel-medialibrary`, `spatie/laravel-activitylog`, `Livewire`, `Laravel Nova`, `Laravel Passport`, and more.
- Additional enterprise features like syncing resources between tenant databases, tenant impersonation, and cached tenant lookup.

**When to use it**:

- For most applications requiring multi-tenancy, this package offers the best balance between features, flexibility, and ease of use.
- Ideal for applications that need enterprise-level features with minimal setup effort.

### Conclusion

- **For a simple project**: Consider `spatie/laravel-multitenancy` for its ease of use and simplicity.
- **For highly custom solutions**: Use `tenancy/tenancy` if you need full control and are building everything from scratch.
- **For a robust, scalable solution**: `stancl/tenancy` is the best choice for the majority of use cases, offering flexibility, ease of testing, and a wide range of features.
- **Avoid `hyn/multi-tenancy`** due to its lack of active development and difficulty with testing.

In most cases, `stancl/tenancy` is the recommended package, providing the most comprehensive solution for Laravel multi-tenancy.
