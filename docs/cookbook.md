# Tangy Form Cookbook
Examples of different recipes when using Tangy Form.

## Skip a question based on input in another question
In the following example we ask an additional question about tangerines if the user indicates that they do like tangerines.

[Run example](https://codepen.io/rjsteinert/pen/QWwQwPJ)

Using `skip-if`:
```html
<tangy-form id="my-form" title="My Form">
  <tangy-form-item id="item1">
    <tangy-checkbox name="input1">
      Do you like tangerines?
    </tangy-checkbox>
    <tangy-input 
      name="input2"
      label="Where do tangerines come from?"
      skip-if="getValue('input1') === ''">
    </tangy-input>
  </tangy-form-item>
</tangy-form>
```
Using helper functions:
```html
<tangy-form id="my-form" title="My Form">
  <tangy-form-item id="item1"
    on-change="
      if (getValue('input1') === '') {
        skip('input2')
      } else {
        unskip('input2')
      }
    "
  >
    <tangy-checkbox name="input1">
      Do you like tangerines?
    </tangy-checkbox>
    <tangy-input 
      name="input2"
      label="Where do tangerines come from?"
    >
    </tangy-input>
  </tangy-form-item>
</tangy-form>
```

## Skip sections based on input
In the following example, wether or not you answer yes or no to the question, you will end up on a different item.

[Run example](https://codepen.io/rjsteinert/pen/WNbjPjZ)
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


## Valid by number of decimal points
In the following example, we validate user input by number of decimal points.

[Run Example](https://codepen.io/rjsteinert/pen/bGNWzrr)
```html

<tangy-form id="my-form" title="My Form">
  <tangy-form-item id="item1">
    <tangy-input name="one" label="Valid to one decimal point." valid-if="/^[0-9]+\.[0-9]/.test(input.value)"></tangy-input>
    <tangy-input name="two" label="Valid to two decimal points." valid-if="/^[0-9]+\.[0-9][0-9]/.test(input.value)"></tangy-input>
    <tangy-input name="three" label="Valid to two three points." valid-if="/^[0-9]+\.[0-9][0-9][0-9]/.test(input.value)"></tangy-input>
  </tangy-form-item>
</tangy-form>
```


## Valid if greater or less than other input

[Run Example](https://codepen.io/rjsteinert/pen/jOEGbGK)
```html
<tangy-form id="my-form" title="My Form">
  <tangy-form-item id="item1">
    <tangy-input 
      name="lucky_number"
      label="What is your lucky number?"
      type="number"
    ></tangy-input>
    <tangy-input
      name="question_two"
      label="What is a number greater than or equal to your lucky number?"
      type="number"
      valid-if="parseInt(getValue('lucky_number')) <= parseInt(getValue('question_two'))"
      error-text="Number must be greater than or equal to your lucky number."
    ></tangy-input>
    <tangy-input
      name="question_three"
      label="What is a number less than or equal to your lucky number?"
      type="number"
      valid-if="parseInt(getValue('lucky_number')) >= parseInt(getValue('question_three'))"
      error-text="Number must be less than or equal to your lucky number."
    ></tangy-input>
  </tangy-form-item>
</tangy-form>
```

## Allowed date range based on today

[Run Example](https://codepen.io/rjsteinert/pen/mdyBeLm)
```html
<tangy-form id="my-form" title="My Form">
  <tangy-form-item 
    id="item1"
    on-open="
      const currentYear = parseInt(new Date().getFullYear())
      inputs.some_date.setAttribute('min-year', currentYear)
      inputs.some_date.setAttribute('max-year', currentYear + 1)
    "
  >
    <tangy-partial-date 
      name="some_date"
      label ="Some date in this year or next:"
    >
    </tangy-partial-date>
  </tangy-form-item>
</tangy-form>
```

## Flag choice as discrepancy and/or warning and show or hide content depending
[Run Example](https://codepen.io/rjsteinert/pen/eYmGGbM)
```html
<tangy-form id="my-form" title="My Form">
  <tangy-form-item id="item1">
    <tangy-radio-buttons
      name="input1"
      label="Answer No or Maybe and this question will be flagged with a warning. Answer No and this question will be flagged with a discrepancy. If your selection causes a discrepancy or warning to be flagged, you may click submit again to proceed. If however you selected No, submitted, then selected Maybe, because you changed your selection you will be required to click submit one last time."
      warn-if="getValue('input1') === 'maybe' || getValue('input1') === 'no'"
      discrepancy-if="getValue('input1') === 'no'"
      discrepancy-text="This is a discrepancy."
      warn-text="This is a warning."
    >
      <option value="maybe">Maybe</option>
      <option value="no">No</option>
      <option value="yes">Yes</option>
    </tangy-radio-buttons>
    <tangy-box name="box1" show-if="getValue('input1') === 'maybe' || getValue('input1') === 'no'">
      This box is an example of giving feedback in a more proactive way as opposed to waiting until the user clicks submit/next.
    </tangy-box>
    <tangy-box name="box2" show-if="inputs.input1.hasDiscrepancy === true || inputs.input1.hasWarning === true">
      This box is an example of how inputs and content can base logic around wether a discrepancy or warning has been flagged.
    </tangy-box>
  </tangy-form-item>
</tangy-form>
```
