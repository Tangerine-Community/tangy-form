// Ported from test/tangy-gate_test.html (web-component-tester) by scratchpad/port-wct-tests.js.
// Assertions are the originals, unchanged. Only the fixture plumbing is new.
import { fixture, registerFixture, installFixtureTeardown, assert } from './karma-fixture.js';

registerFixture('TangyGateFixture', `
<tangy-gate name="gate" inprogress="Saving to server..." success="Saved!"></tangy-gate>
`);

import '../input/tangy-gate.js'
      suite('tangy-gate', () => {
    installFixtureTeardown();
        
        test('be invalid until value is set', () => {
          const element = fixture('TangyGateFixture');
          assert.equal(element.validate(), false)
          element.value = true
          assert.equal(element.validate(), true)
        })

      })
