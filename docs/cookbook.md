# Tangy Form Cookbook
Examples of different recipes when using Tangy Form.

## Tangy Input

### valid-if

One decimal point:
```html
<tangy-input name="example" label="Example" valid-if="/^[0-9]+\.[0-9]/.test(input.value)"></tangy-input>
```

Two decimal points:
```html
<tangy-input name="example" label="Example" valid-if="/^[0-9]+\.[0-9][0-9]/.test(input.value)"></tangy-input>
```

Three decimal points:
```html
<tangy-input name="example" label="Example" valid-if="/^[0-9]+\.[0-9][0-9][0-9]$/.test(input.value)"></tangy-input>
```
