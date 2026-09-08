// Ported from test/tangy-radio-button_test.html (web-component-tester) by scratchpad/port-wct-tests.js.
// Assertions are the originals, unchanged. Only the fixture plumbing is new.
import { fixture, registerFixture, installFixtureTeardown, assert } from './karma-fixture.js';

registerFixture('TangyRadioButtonHideButtonFixture', `
<tangy-radio-button name="foo" hide-button>Foo</tangy-radio-button>
`);

import '../input/tangy-radio-button.js'
      suite('tangy-radio-button', () => {
    installFixtureTeardown();
        test('should hide button')
      })
