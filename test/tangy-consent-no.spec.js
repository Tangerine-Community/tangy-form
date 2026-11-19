// Tapping No on tangy-consent must end the form the same way the Submit button does.
// Apps (the online survey, the Tangerine tablet) save and leave the form on after-submit,
// so a No that only fired submit left the response unsaved.
import { fixture, registerFixture, installFixtureTeardown, assert } from './karma-fixture.js';
import '../tangy-form.js';
import '../input/tangy-input.js';
import '../input/tangy-consent.js';

registerFixture('ConsentNoFixture', `
<tangy-form id="consent-form" title="Consent form">
  <tangy-form-item id="item1" title="1">
    <tangy-consent name="consent"></tangy-consent>
  </tangy-form-item>
  <tangy-form-item id="item2" title="2">
    <tangy-input name="input2" label="Only asked after Yes"></tangy-input>
  </tangy-form-item>
</tangy-form>
`);

function countEvents(element, names) {
  const counts = {};
  names.forEach((name) => {
    counts[name] = 0;
    element.addEventListener(name, () => counts[name]++);
  });
  return counts;
}

suite('tangy-consent No', () => {
  installFixtureTeardown();

  test('tapping No fires tangy-form-complete and after-submit, and completes the response', () => {
    const element = fixture('ConsentNoFixture');
    element.newResponse();
    const counts = countEvents(element, ['submit', 'tangy-form-complete', 'after-submit']);
    const item = element.querySelector('#item1');
    item.shadowRoot.querySelector('dom-if').render();
    item.querySelector('[name=consent]').shadowRoot.querySelector('#consentNoButton').click();
    assert.equal(counts['submit'], 1);
    // A normal Submit fires tangy-form-complete twice (tangy-form.js onFormResponseComplete); No matches it.
    assert.isAtLeast(counts['tangy-form-complete'], 1);
    assert.equal(counts['after-submit'], 1);
    assert.equal(element.response.complete, true);
    assert.equal(element.response.items[0].inputs[0].value, 'no');
  });

  test('a listener that cancels submit still stops the No before after-submit', () => {
    const element = fixture('ConsentNoFixture');
    element.newResponse();
    element.addEventListener('submit', (event) => event.preventDefault());
    const counts = countEvents(element, ['after-submit']);
    const item = element.querySelector('#item1');
    item.shadowRoot.querySelector('dom-if').render();
    item.querySelector('[name=consent]').shadowRoot.querySelector('#consentNoButton').click();
    assert.equal(counts['after-submit'], 0);
    assert.equal(element.response.complete, false);
  });
});
