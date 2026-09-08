// Ported from test/tangy-checkboxes_test.html (web-component-tester) by scratchpad/port-wct-tests.js.
// Assertions are the originals, unchanged. Only the fixture plumbing is new.
import { fixture, registerFixture, installFixtureTeardown, assert } from './karma-fixture.js';

registerFixture('TangyCheckboxesFixture', `
<tangy-checkboxes value="fruit_selection" label="What is your favorite fruit?">
          <option value="orange">Orange</option>
          <option value="banana">Banana</option>
          <option value="tangerine">Tangerine</option>
          <option value="cantalope">Cantalope</option>
          <option value="cherry">Cherry</option>
          <option value="kiwi">Kiwi</option>
        </tangy-checkboxes>
`);

registerFixture('TangyCheckboxesWithValueFixture', `
<tangy-checkboxes name="fruit_selection" label="What is your favorite fruit?" value='[{"name":"orange","label":"Orange","required":false,"disabled":false,"invalid":false,"incomplete":true,"hidden":false,"value":"","errorText":"","tagName":"TANGY-CHECKBOX"},{"name":"banana","label":"Banana","required":false,"disabled":false,"invalid":false,"incomplete":true,"hidden":false,"value":"on","errorText":"","tagName":"TANGY-CHECKBOX"},{"name":"tangerine","label":"Tangerine","required":false,"disabled":false,"invalid":false,"incomplete":true,"hidden":false,"value":"","errorText":"","tagName":"TANGY-CHECKBOX"},{"name":"cantalope","label":"Cantalope","required":false,"disabled":false,"invalid":false,"incomplete":true,"hidden":false,"value":"on","errorText":"","tagName":"TANGY-CHECKBOX"},{"name":"cherry","label":"Cherry","required":false,"disabled":false,"invalid":false,"incomplete":true,"hidden":false,"value":"","errorText":"","tagName":"TANGY-CHECKBOX"},{"name":"kiwi","label":"Kiwi","required":false,"disabled":false,"invalid":false,"incomplete":true,"hidden":false,"value":"","errorText":"","tagName":"TANGY-CHECKBOX"}]'>
          <option value="orange">Orange</option>
          <option value="banana">Banana</option>
          <option value="tangerine">Tangerine</option>
          <option value="cantalope">Cantalope</option>
          <option value="cherry">Cherry</option>
          <option value="kiwi">Kiwi</option>
        </tangy-checkboxes>
`);

registerFixture('TangyCheckboxesHintTextFixture', `
<tangy-checkboxes name="fruit_selection" label="What is your favorite fruit?">
          <option value="orange" hint-text='Oranges but not tangerines.'>Orange</option>
          <option value="banana">Banana</option>
          <option value="tangerine">Tangerine</option>
          <option value="cantalope">Cantalope</option>
          <option value="cherry">Cherry</option>
          <option value="kiwi">Kiwi</option>
        </tangy-checkboxes>
`);

registerFixture('TangyCheckboxesMutuallyExclusiveFixture', `
<tangy-checkboxes name="favorite_fruits" label="What are some of your favorite fruits?">
          <option value="orange">Orange</option>
          <option value="banana">Banana</option>
          <option value="tangerine">Tangerine</option>
          <option value="favorite_is_not_an_option" mutually-exclusive>None of the above.</option>
        </tangy-checkboxes>
`);

registerFixture('TangyCheckboxesTwoMutuallyExclusiveOptionsFixture', `
<tangy-checkboxes name="favorite_fruits" label="What are some of your favorite fruits?">
          <option value="orange">Orange</option>
          <option value="banana">Banana</option>
          <option value="tangerine">Tangerine</option>
          <option value="favorite_is_not_an_option" mutually-exclusive>None of the above.</option>
          <option value="na" mutually-exclusive>I don't like fruit.</option>
        </tangy-checkboxes>
`);

import '../input/tangy-checkboxes.js'
      suite('tangy-checkboxes', () => {
    installFixtureTeardown();

        test('should have six options', () => {
          const element = fixture('TangyCheckboxesFixture');
          assert.equal(element.shadowRoot.querySelectorAll('tangy-checkbox').length, 6)
        })

        test('should have value set from markup', () => {
          const element = fixture('TangyCheckboxesWithValueFixture');
          assert.equal(element.value.find(item => item.name === 'cantalope').value, 'on')
          assert.equal(element.value.find(item => item.name === 'banana').value, 'on')
          assert.equal(element.value.find(item => item.name === 'tangerine').value, '')
        })

        test('should set value back to default applying skipped attribute', () => {
          const element = fixture('TangyCheckboxesFixture');
          element.shadowRoot.querySelectorAll('tangy-checkbox')[0].value = 'on'
          element.shadowRoot.querySelectorAll('tangy-checkbox')[0].dispatchEvent(new Event('change',{bubbles:true}))
          element.setAttribute('skipped', '')
          assert.equal(element.shadowRoot.querySelectorAll('tangy-checkbox')[0].value, '')
          assert.equal(element.value[0].value, '')
        })

        test('should have hint text', () => {
          const element = fixture('TangyCheckboxesHintTextFixture');
          assert.equal(element.shadowRoot.querySelector('tangy-checkbox').shadowRoot.innerHTML.includes('Oranges'), true)
        })

        test('selecting mutually-exclusive option should remove prior choices', () => {
          const element = fixture('TangyCheckboxesMutuallyExclusiveFixture');
          element.shadowRoot.querySelectorAll('tangy-checkbox')[0].value = 'on'
          element.shadowRoot.querySelectorAll('tangy-checkbox')[0].dispatchEvent(new Event('change', {bubbles:true}))
          element.shadowRoot.querySelectorAll('tangy-checkbox')[1].value = 'on'
          element.shadowRoot.querySelectorAll('tangy-checkbox')[1].dispatchEvent(new Event('change', {bubbles:true}))
          element.shadowRoot.querySelectorAll('tangy-checkbox')[3].value = 'on'
          element.shadowRoot.querySelectorAll('tangy-checkbox')[3].dispatchEvent(new Event('change', {bubbles:true}))
          assert.equal(element.shadowRoot.querySelectorAll('tangy-checkbox')[0].value, '')
          assert.equal(element.shadowRoot.querySelectorAll('tangy-checkbox')[1].value, '')
          assert.equal(element.shadowRoot.querySelectorAll('tangy-checkbox')[3].value, 'on')
          assert.equal(element.value[0].value, '')
          assert.equal(element.value[1].value, '')
          assert.equal(element.value[3].value, 'on')
        })

        test('selecting non mutually-exclusive option should remove mutually-exclusive selection', () => {
          const element = fixture('TangyCheckboxesMutuallyExclusiveFixture');
         element.shadowRoot.querySelectorAll('tangy-checkbox')[1].value = 'on'
          element.shadowRoot.querySelectorAll('tangy-checkbox')[1].dispatchEvent(new Event('change', {bubbles:true}))
          element.shadowRoot.querySelectorAll('tangy-checkbox')[3].value = 'on'
          element.shadowRoot.querySelectorAll('tangy-checkbox')[3].dispatchEvent(new Event('change', {bubbles:true}))
          element.shadowRoot.querySelectorAll('tangy-checkbox')[0].value = 'on'
          element.shadowRoot.querySelectorAll('tangy-checkbox')[0].dispatchEvent(new Event('change', {bubbles:true}))
          assert.equal(element.shadowRoot.querySelectorAll('tangy-checkbox')[0].value, 'on')
          assert.equal(element.shadowRoot.querySelectorAll('tangy-checkbox')[1].value, '')
          assert.equal(element.shadowRoot.querySelectorAll('tangy-checkbox')[3].value, '')
          assert.equal(element.value[0].value, 'on')
          assert.equal(element.value[1].value, '')
          assert.equal(element.value[3].value, '')
        })

        test('selecting one mutually-exclusive option should remove other mutually-exclusive selection', () => {
          const element = fixture('TangyCheckboxesTwoMutuallyExclusiveOptionsFixture');
          element.shadowRoot.querySelectorAll('tangy-checkbox')[0].value = 'on'
          element.shadowRoot.querySelectorAll('tangy-checkbox')[0].dispatchEvent(new Event('change', {bubbles:true}))
          element.shadowRoot.querySelectorAll('tangy-checkbox')[1].value = 'on'
          element.shadowRoot.querySelectorAll('tangy-checkbox')[1].dispatchEvent(new Event('change', {bubbles:true}))
          element.shadowRoot.querySelectorAll('tangy-checkbox')[3].value = 'on'
          element.shadowRoot.querySelectorAll('tangy-checkbox')[3].dispatchEvent(new Event('change', {bubbles:true}))
          element.shadowRoot.querySelectorAll('tangy-checkbox')[4].value = 'on'
          element.shadowRoot.querySelectorAll('tangy-checkbox')[4].dispatchEvent(new Event('change', {bubbles:true}))
          assert.equal(element.shadowRoot.querySelectorAll('tangy-checkbox')[0].value, '')
          assert.equal(element.shadowRoot.querySelectorAll('tangy-checkbox')[1].value, '')
          assert.equal(element.shadowRoot.querySelectorAll('tangy-checkbox')[3].value, '')
          assert.equal(element.shadowRoot.querySelectorAll('tangy-checkbox')[4].value, 'on')
          assert.equal(element.value[0].value, '')
          assert.equal(element.value[1].value, '')
          assert.equal(element.value[3].value, '')
          assert.equal(element.value[4].value, 'on')
        })
        

      })
