// Ported from test/tangy-keyboard-input_test.html (web-component-tester) by scratchpad/port-wct-tests.js.
// Assertions are the originals, unchanged. Only the fixture plumbing is new.
import { fixture, registerFixture, installFixtureTeardown, assert } from './karma-fixture.js';

registerFixture('TangyKeyboardInputFixture', `
<tangy-keyboard-input
          keys="a b c d"
          name="fruit_selection"
          hint-text="Do you agree?">
        </tangy-checkbox>
`);

import '../input/tangy-keyboard-input.js'
      suite('tangy-keyboard-input', () => {
    installFixtureTeardown();

        test('should have hint text', () => {
          const element = fixture('TangyKeyboardInputFixture');
        })

      })
