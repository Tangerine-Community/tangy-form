# Tangy Form Cookbook
Examples of different recipes when using Tangy Form.

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
        <tangy-input name="lucky_number" label="What is your lucky number?" type="number"></tangy-input>
        <tangy-input name="question_two" label="What is a number greater than or equal to your lucky number?" valid-if="parseInt(getValue('lucky_number')) <= parseInt(getValue('question_two'))" error-text="Number must be greater than or equal to your lucky number."></tangy-input>
        <tangy-input name="question_three" label="What is a number less than or equal to your lucky number?" valid-if="parseInt(getValue('lucky_number')) >= parseInt(getValue('question_three'))" error-text="Number must be less than or equal to your lucky number."></tangy-input>
      </tangy-form-item>
    </tangy-form>
```
