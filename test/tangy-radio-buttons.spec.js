// Ported from test/tangy-radio-buttons_test.html (web-component-tester) by scratchpad/port-wct-tests.js.
// Assertions are the originals, unchanged. Only the fixture plumbing is new.
import { fixture, registerFixture, installFixtureTeardown, assert } from './karma-fixture.js';

registerFixture('TangyRadioButtonsFixture', `
<tangy-radio-buttons name="fruit_selection" label="What is your favorite fruit?">
          <option name="orange">Orange</option>
          <option name="banana">Banana</option>
          <option name="tangerine">Tangerine</option>
          <option name="cantalope">Cantalope</option>
          <option name="cherry">Cherry</option>
          <option name="kiwi">Kiwi</option>
        </tangy-radio-buttons>
`);

registerFixture('TangyRadioButtonsWithValueFixture', `
<tangy-radio-buttons name="fruit_selection" label="What is your favorite fruit?" value='[{"hideButton":false,"name":"Orange","label":"","required":false,"disabled":false,"invalid":false,"incomplete":true,"hidden":false,"value":"","tagName":"TANGY-RADIO-BUTTON"},{"hideButton":false,"name":"Banana","label":"","required":false,"disabled":false,"invalid":false,"incomplete":true,"hidden":false,"value":"","tagName":"TANGY-RADIO-BUTTON"},{"hideButton":false,"name":"Tangerine","label":"","required":false,"disabled":false,"invalid":false,"incomplete":true,"hidden":false,"value":"on","tagName":"TANGY-RADIO-BUTTON"},{"hideButton":false,"name":"Cantalope","label":"","required":false,"disabled":false,"invalid":false,"incomplete":true,"hidden":false,"value":"","tagName":"TANGY-RADIO-BUTTON"},{"hideButton":false,"name":"Cherry","label":"","required":false,"disabled":false,"invalid":false,"incomplete":true,"hidden":false,"value":"","tagName":"TANGY-RADIO-BUTTON"},{"hideButton":false,"name":"Kiwi","label":"","required":false,"disabled":false,"invalid":false,"incomplete":true,"hidden":false,"value":"","tagName":"TANGY-RADIO-BUTTON"}]'>
          <option name="orange">Orange</option>
          <option name="banana">Banana</option>
          <option name="tangerine">Tangerine</option>
          <option name="cantalope">Cantalope</option>
          <option name="cherry">Cherry</option>
          <option name="kiwi">Kiwi</option>
        </tangy-radio-buttons>
`);

registerFixture('TangyRadioButtonsWithColumnsFixture', `
<tangy-radio-buttons no-margin columns="3" name="fruit_selection" label="What is your favorite fruit?">
          <option name="orange">Orange</option>
          <option name="banana">Banana</option>
          <option name="tangerine">Tangerine</option>
          <option name="cantalope">Cantalope</option>
          <option name="cherry">Cherry</option>
          <option name="kiwi">Kiwi</option>
        </tangy-radio-buttons>
`);

registerFixture('TangyRadioButtonsHideButtonsFixture', `
<tangy-radio-buttons name="fruit_selection" label="What is your favorite fruit?" hide-buttons>
          <option name="orange">Orange</option>
          <option name="banana">Banana</option>
          <option name="tangerine">Tangerine</option>
          <option name="cantalope">Cantalope</option>
          <option name="cherry">Cherry</option>
          <option name="kiwi">Kiwi</option>
        </tangy-radio-buttons>
`);

import '../input/tangy-radio-buttons.js'
      suite('tangy-radio-buttons', () => {
    installFixtureTeardown();

        test('should have six options', () => {
          const element = fixture('TangyRadioButtonsFixture');
          assert.equal(element.shadowRoot.querySelectorAll('tangy-radio-button').length, 6)
        })

        test('should have six options with one selected from value in markup', () => {
          const element = fixture('TangyRadioButtonsWithValueFixture');
          assert.equal(element.value.find(item => item.name === 'Tangerine').value, 'on')
        })

        test('should have three columns', () => {
          const element = fixture('TangyRadioButtonsWithColumnsFixture');
          assert.equal(element.offsetHeight > 50, true)
        })

        test('should set value back to default applying skipped attribute', () => {
          const element = fixture('TangyRadioButtonsFixture');
          element.shadowRoot.querySelectorAll('tangy-radio-button')[0].click()
          element.shadowRoot.querySelectorAll('tangy-radio-button')[0].dispatchEvent(new Event('change',{bubbles:true}))
          element.setAttribute('skipped', '')
          assert.equal(element.shadowRoot.querySelectorAll('tangy-radio-button')[0].value, '')
          assert.equal(element.value[0].value, '')
        })

      })
