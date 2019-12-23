# Tangy Form Cookbook
Examples of different recipes when using Tangy Form.

## Tangy Input

### valid-if

One decimal point:
```
<tangy-input name="example" label="Example" valid-if="/^[0-9]+\.[0-9]/.test(input.value)"></tangy-input>
```

Two decimal points:
```

<tangy-input name="example" label="Example" valid-if="/^[0-9]+\.[0-9][0-9]/.test(input.value)"></tangy-input>
```

Three decimal points:
```
<tangy-input name="example" label="Example" valid-if="/^[0-9]+\.[0-9][0-9][0-9]$/.test(input.value)"></tangy-input>
```
