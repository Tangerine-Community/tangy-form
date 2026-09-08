// Ported from test/_element_test.html (web-component-tester) by scratchpad/port-wct-tests.js.
// Assertions are the originals, unchanged. Only the fixture plumbing is new.
import { fixture, registerFixture, installFixtureTeardown, assert } from './karma-fixture.js';

registerFixture('BasicTestFixture', `
<tangy-form></tangy-form>
`);

registerFixture('ChangedPropertyTestFixture', `
<tangy-form prop1="new-prop1"></tangy-form>
`);

suite('tangy-form', () => {
    installFixtureTeardown();

        test('instantiating the element works', () => {
          const element = fixture('BasicTestFixture');
          assert.equal(true, true);
        });
        /* TODO: Write some actual tests.
        test('instantiating the element with default properties works', () => {
          const element = fixture('BasicTestFixture');
          assert.equal(element.prop1, 'tangy-form');
          const elementShadowRoot = element.shadowRoot;
          const elementHeader = elementShadowRoot.querySelector('h2');
          assert.equal(elementHeader.innerHTML, 'Hello tangy-form!');
        });

        test('setting a property on the element works', () => {
          // Create a test fixture
          const element = fixture('ChangedPropertyTestFixture');
          assert.equal(element.prop1, 'new-prop1');
          const elementShadowRoot = element.shadowRoot;
          const elementHeader = elementShadowRoot.querySelector('h2');
          assert.equal(elementHeader.innerHTML, 'Hello new-prop1!');
        });
        */

      });
