# Interpolation

Interpolation refers to embedding expressions into marked up text. By default, interpolation uses the double curly braces ```{{``` and ```}}``` as delimiters.

To illustrate how interpolation works, consider an Angular component that contains a currentCustomer variable:

```bash
currentCustomer = 'Maria';
```
Use interpolation to display the value of this variable in the corresponding component template:

``` bash
<h3>Current customer: {{ currentCustomer }}</h3>
```
Angular replaces currentCustomer with the string value of the corresponding component property. In this case, the value is Maria.

In the following example, Angular evaluates the title and itemImageUrl properties to display some title text and an image.

```bash
<p>{{title}}</p>

<div><img alt="item" src="{{itemImageUrl}}"></div>
```
<BadgeLink colorScheme='blue' badgeText='Official Website' href='ttps://angular.io/guide/interpolation'>Angular Official Website</BadgeLink>
