// Ported from test/tangy-input_test.html (web-component-tester) by scratchpad/port-wct-tests.js.
// Assertions are the originals, unchanged. Only the fixture plumbing is new.
import { fixture, registerFixture, installFixtureTeardown, assert } from './karma-fixture.js';

registerFixture('TangyInputFixture', `
<tangy-input name="foo" label="This is a label"></tangy-input>
`);

registerFixture('TangyInputWithMarkupFixture', `
<tangy-input name="foo" label="This is a <b>bold label</b>"></tangy-input>
`);

registerFixture('TranslatablePlaceholderFixture', `
<tangy-input name="foo" placeholder="<t-lang en>Hello</t-lang><t-lang fr>Bonjour</t-lang>"></tangy-input>
`);

registerFixture('MinMaxFixture', `
<tangy-input name="foo" label="foo" type="number" min="30" max="50"></tangy-input>
`);

registerFixture('TangyInputInAForm', `
<tangy-form id="my-form" title="My Form">
          <tangy-form-item id="item1">
            <tangy-input name="input1" label="What is your first name?" required></tangy-input>
          </tangy-form-item>
          <tangy-form-item id="item2">
            <tangy-input name="input2" label="What is your last name?" required></tangy-input>
          </tangy-form-item>
        </tangy-form>
`);

registerFixture('DisableInAForm', `
<tangy-form id="my-form" title="My Form">
          <tangy-form-item id="item1">
            <tangy-input name="input1" label="What is your first name?" disable-if="getValue('input2') === 'on'" required></tangy-input>
            <tangy-checkbox name="input2">Disable the input</tangy-checkbox>
          </tangy-form-item>
          <tangy-form-item id="item2">
            <tangy-input name="input2" label="What is your last name?" required></tangy-input>
          </tangy-form-item>
        </tangy-form>
`);

import * as Polymer from '../node_modules/@polymer/polymer/polymer-legacy.js'
      import '../input/tangy-input.js'
      import '../input/tangy-checkbox.js'
      suite('tangy-input', () => {
    installFixtureTeardown();

        test('should have value set', async function() {
          const element = fixture('TangyInputFixture');
          element.value = 'Test'
        })

        test('should have label with markup', async function() {
          const element = fixture('TangyInputWithMarkupFixture');
          assert('This is a <b>bold label</b>', element.shadowRoot.querySelector('#label').innerHTML)
        })

        test('should have translated hint text', async function() {
          window.document.lang = 'fr'
          const element = fixture('TranslatablePlaceholderFixture');
          assert(element.shadowRoot.querySelector('#input').placeholder, 'Bonjour')
        })

        test('min and max should validate value', (done) => {
          const inputEl = fixture('MinMaxFixture');
          inputEl.setAttribute('value', '44')
          // Wait a tick for the underlying paper-input to catch up for validation purposes.
          Polymer.Base.async(function() {
            assert.equal(inputEl.validate(), true)
            inputEl.setAttribute('value', '55')
            Polymer.Base.async(function() {
              assert.equal(inputEl.validate(), false)
              done()
            })
          })
        });

        test('should resume in a form', function() {
          const form = fixture('TangyInputInAForm');
          form.newResponse()
          form.querySelector('#item1').shadowRoot.querySelector('dom-if').render()
          form.querySelector('#item1').querySelector('[name="input1"]').value = 'foo'
          form.querySelector('#item1').shadowRoot.querySelector('#next').click()
          form.querySelector('#item2').shadowRoot.querySelector('dom-if').render()
          form.querySelector('#item2').shadowRoot.querySelector('#back').click()
          form.querySelector('#item1').shadowRoot.querySelector('dom-if').render()
          assert(form.querySelector('#item1').querySelector('[name="input1"]').value, 'foo')
        })

        test('should be valid when disabled', function() {
          const form = fixture('DisableInAForm');
          form.newResponse()
          form.querySelector('#item1').shadowRoot.querySelector('dom-if').render()
          form.querySelector('#item1').querySelector('[name="input2"]').value = 'on'
          form.querySelector('#item1').querySelector('[name="input2"]').dispatchEvent(new Event('change'))
          form.querySelector('#item1').shadowRoot.querySelector('#next').click()
          assert.equal(form.querySelector('#item1').hasAttribute('false'), false)
        })
      })
