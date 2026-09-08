// Ported from test/tangy-checkbox_test.html (web-component-tester) by scratchpad/port-wct-tests.js.
// Assertions are the originals, unchanged. Only the fixture plumbing is new.
import { fixture, registerFixture, installFixtureTeardown, assert } from './karma-fixture.js';

registerFixture('TangyCheckboxFixture', `
<tangy-checkbox name="fruit_selection" hint-text="Do you agree?">Check if you agree.</tangy-checkbox>
`);

import '../input/tangy-checkbox.js'
      suite('tangy-checkbox', () => {
    installFixtureTeardown();

        test('should have hint text', () => {
          const element = fixture('TangyCheckboxFixture');
          assert.equal(element.shadowRoot.innerHTML.includes('Do you agree?'), true)
        })
        
        test('should set value back to default applying skipped attribute', () => {
          const element = fixture('TangyCheckboxFixture');
          element.shadowRoot.querySelectorAll('paper-checkbox')[0].click()
          element.shadowRoot.querySelectorAll('paper-checkbox')[0].dispatchEvent(new Event('change',{bubbles:true}))
          element.setAttribute('skipped', '')
          assert.equal(element.shadowRoot.querySelectorAll('paper-checkbox')[0].hasAttribute('checked'), false)
          assert.equal(element.value, '')
        })

      })
