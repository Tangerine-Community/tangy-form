# Tangy Form Cookbook
Examples of different recipes when using Tangy Form.

## Skip sections based on input
In the following example, wether or not you answer yes or no to the question, you will end up on a different item.

[Run example](https://codepen.io/rjsteinert/pen/RXxwmP)
```html
    <tangy-form id="my-form" title="My Form"
      on-change="
        if (getValue('likes_tangerine') === 'yes') {
          sectionEnable('item2')
          sectionDisable('item3')
        } else {
          sectionDisable('item2')
          sectionEnable('item3')
        }      
      "
    >
      <tangy-form-item id="item1">
        <tangy-radio-buttons name="likes_tangerines" label="Do you like tangerines?">
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </tangy-radio-buttons>
      </tangy-form-item>
      <tangy-form-item id="item2">
        That's great! We'll make sure to supply you plenty of tangerines.
      </tangy-form-item>
      <tangy-form-item id="item3">
        That's ok. We'll make sure to provide other fruit for you.
      </tangy-form-item>
    </tangy-form>
```

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
