# NonNullable Utility Type

`NonNullable` is a utility type that removes `null` and `undefined` from a type. If you have a type that could potentially be `null` or `undefined`, applying `NonNullable` ensures that the resulting type will only consist of the original type's other possible values, effectively guaranteeing that `null` and `undefined` are excluded.