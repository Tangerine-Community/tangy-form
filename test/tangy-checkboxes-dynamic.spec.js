// Ported from test/tangy-checkboxes-dynamic_test.html (web-component-tester) by scratchpad/port-wct-tests.js.
// Assertions are the originals, unchanged. Only the fixture plumbing is new.
import { fixture, registerFixture, installFixtureTeardown, assert } from './karma-fixture.js';

registerFixture('TangyCheckboxesDynamicFixture', `
<tangy-checkboxes-dynamic
                name="curriculum"
                label="Curriculum"
                options-list-source="checkboxes-dynamic-forms.json"
                options-list-excludes="class-registration,student-registration"
                options-list-properties="id,title"
                options-list-exclude-by="id">
        </tangy-checkboxes-dynamic>
`);

import '../input/tangy-checkboxes-dynamic.js'
      suite('tangy-checkboxes-dynamic', () => {
    installFixtureTeardown();
        test('should have two options', () => {
          const element = fixture('TangyCheckboxesDynamicFixture');
          element.addEventListener('checkbox-options-loaded', () => {
            assert.equal(element.shadowRoot.querySelectorAll('option').length, 2)
          })
        })
      })
