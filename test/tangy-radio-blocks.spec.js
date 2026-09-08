// Ported from test/tangy-radio-blocks_test.html (web-component-tester) by scratchpad/port-wct-tests.js.
// Assertions are the originals, unchanged. Only the fixture plumbing is new.
import { fixture, registerFixture, installFixtureTeardown, assert } from './karma-fixture.js';

registerFixture('TangyRadioBlocksFixture', `
<tangy-radio-blocks
          name="radioBlocks1"
        > 
          <option value="a">a</option>
          <option value="b">b</option>
          <option value="c">c</option>
        </tangy-radio-blocks>
`);

import '../input/tangy-radio-blocks.js'
      suite('tangy-radio-blocks', () => {
    installFixtureTeardown();

        test('should have three options', () => {
          const element = fixture('TangyRadioBlocksFixture');
          assert.equal(element.shadowRoot.querySelectorAll('tangy-radio-block').length, 3)
        })

        test('should only have one option selected', () => {
          const element = fixture('TangyRadioBlocksFixture');
          element.shadowRoot.querySelectorAll('tangy-radio-block')[0].click()
          element.shadowRoot.querySelectorAll('tangy-radio-block')[0].dispatchEvent(new Event('change',{bubbles:true}))
          element.shadowRoot.querySelectorAll('tangy-radio-block')[1].click()
          element.shadowRoot.querySelectorAll('tangy-radio-block')[1].dispatchEvent(new Event('change',{bubbles:true}))
          assert.equal([...element.shadowRoot.querySelectorAll('tangy-radio-block')].filter(n => n.value === 'on').length, 1)
        })

      })
