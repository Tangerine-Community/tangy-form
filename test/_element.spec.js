// Ported from test/_element_test.html (web-component-tester) by scratchpad/port-wct-tests.js.
// Assertions are the originals, unchanged. Only the fixture plumbing is new.
import { fixture, registerFixture, installFixtureTeardown, afterMs, assert } from './karma-fixture.js';

// One item: an empty <tangy-form> throws in newResponse() after its first render (no items[0]), and
// a sync test let that throw land in whichever test ran next. The test now waits for that render.
registerFixture('BasicTestFixture', `
<tangy-form><tangy-form-item id="item1"></tangy-form-item></tangy-form>
`);

registerFixture('ChangedPropertyTestFixture', `
<tangy-form prop1="new-prop1"></tangy-form>
`);

suite('tangy-form', () => {
    installFixtureTeardown();

        test('instantiating the element works', async () => {
          const element = fixture('BasicTestFixture');
          await afterMs(500);
          assert.isOk(element.response, 'the form never opened a response');
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
