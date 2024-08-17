# v-else

The `v-else` conditional complements the `v-if` conditional.
An `v-else` element must immediately follow an `v-if` element.

The `v-else` conditionally renders an element or a template fragment as a function in case the `v-if` does not fulfill the condition.

For example:

``` vue

<templete>
    <p v-if="user === 'Admin'" >
        EL usuario es Admin
    </p>
    <p v-if="type === 'A'" >
        EL usuario no es Admin
    </p>
</templete>

```

Visit the following resources for more information:

- [@official@v-if](https://vuejs.org/api/built-in-directives.html#v-else) documentation.
