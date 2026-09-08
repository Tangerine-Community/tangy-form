// Ported from test/tangy-template_test.html (web-component-tester) by scratchpad/port-wct-tests.js.
// Assertions are the originals, unchanged. Only the fixture plumbing is new.
import { fixture, registerFixture, installFixtureTeardown, assert } from './karma-fixture.js';

registerFixture('TangyTemplateFixture', `
<tangy-form id="form1">
          <tangy-form-item id="item1">
            <tangy-input name="input1" label="input1"></tangy-input>
          </tangy-form-item>
          <tangy-form-item id="item2">
            <tangy-template name="foo">Output \${getValue('input1')}</tangy-template>
          </tangy-form-item>
        </tangy-form>
`);

registerFixture('TangyTemplateSimple', `
<tangy-form id="form1">
          <tangy-form-item id="item1">
            <tangy-template name="foo">Test</tangy-template>
          </tangy-form-item>
        </tangy-form>
`);

registerFixture('TangyTemplateAdvanced', `
<tangy-form id="form1">
          <tangy-form-item id="item1">
            <tangy-input name="input1" label="Number"></tangy-input>
            <tangy-template name="foo">
              <h1>
                \${getValue('input1')}
                is 
                \${parseInt(getValue('input1')) >= 42 && true
                  ? \`greater than or equal to\`
                  : \`less than\`
                } 
                42.
              </h1>
            </tangy-template>
          </tangy-form-item>
        </tangy-form>
`);

registerFixture('TangyTemplateInjectFixture', `
<tangy-form id="form1">
          <tangy-form-item id="item1">
            <tangy-template name="foo">\${foo}</tangy-template>
          </tangy-form-item>
        </tangy-form>
`);

registerFixture('TangyTemplateDirectiveFixture', `
<tangy-form id="form1">
          <tangy-form-item id="item1">
            <tangy-input name="input1" label="input1"></tangy-input>
          </tangy-form-item>
          <tangy-form-item id="item2">
            <tangy-template name="template1" dont-skip-if="getValue('input1') === '1'">template1</tangy-template>
            <tangy-template name="template2" dont-skip-if="getValue('input1') === '2'">template2</tangy-template>
          </tangy-form-item>
        </tangy-form>
`);

// tangy-template imported by tangy-form.
      import '../tangy-form.js'
      import '../input/tangy-input.js'
      suite('tangy-template', () => {
    installFixtureTeardown();
        test('should have templated output', function () {
          const form = fixture('TangyTemplateFixture');
          form.newResponse()
          form.querySelector('#item1').shadowRoot.querySelector('dom-if').render()
          form.querySelector('#item1').querySelector('[name="input1"]').value = 'foo'
          form.querySelector('#item1').shadowRoot.querySelector('#next').click()
          assert.equal(form.querySelector('#item2').querySelector('tangy-template').$.container.innerText, 'Output foo')
        })
        test('should have templated output when reviewed in a submitted form', function () {
          const form = fixture('TangyTemplateSimple');
          form.newResponse()
          form.querySelector('#item1').shadowRoot.querySelector('dom-if').render()
          form.querySelector('#item1').shadowRoot.querySelector('#complete').click()
          form.querySelector('#item1').shadowRoot.querySelector('dom-if').render();
          form.querySelector('#item1').shadowRoot.querySelector('#open').click()
          form.querySelector('#item1').shadowRoot.querySelector('dom-if').render();
          assert.equal(form.querySelector('#item1').querySelector('tangy-template').$.container.innerText, 'Test')
        })
        test('should have dynamic templated output when reviewed in a submitted form', function () {
          const form = fixture('TangyTemplateFixture');
          form.newResponse()
          form.querySelector('#item1').shadowRoot.querySelector('dom-if').render()
          form.querySelector('#item1').querySelector('[name="input1"]').value = 'foo'
          form.querySelector('#item1').shadowRoot.querySelector('#next').click()
          form.querySelector('#item2').shadowRoot.querySelector('dom-if').render()
          form.querySelector('#item2').shadowRoot.querySelector('#complete').click()
          form.querySelector('#item2').shadowRoot.querySelector('dom-if').render();
          form.querySelector('#item2').shadowRoot.querySelector('#open').click()
          form.querySelector('#item2').shadowRoot.querySelector('dom-if').render();
          assert.equal(form.querySelector('#item2').querySelector('tangy-template').$.container.innerText, 'Output foo')
       })
        test('should have templated output from advanced condition', function () {
          const form = fixture('TangyTemplateAdvanced');
          form.newResponse()
          form.querySelector('#item1').querySelector('[name=input1]').value = '43'
          form.querySelector('#item1').querySelector('[name=input1]').dispatchEvent(new Event('change', {bubbles:true}))
          // Make sure greater than, less than, and ampersands are converted correctly into code to create the resulting string. 
          assert.equal(form.querySelector('#item1').querySelector('tangy-template').shadowRoot.querySelector('#container').innerText, '43 is greater than or equal to 42.')
          // Ensure that markup did not get pruned either.
          assert.equal(!!form.querySelector('#item1').querySelector('tangy-template').shadowRoot.querySelector('#container').querySelector('h1'), true)
        })
        test('should have templated output using injected variables', function () {
          const form = fixture('TangyTemplateInjectFixture');
          form.inject('foo', 'bar')
          form.newResponse()
          form.querySelector('#item1').shadowRoot.querySelector('dom-if').render()
          assert.equal(form.querySelector('#item1').querySelector('tangy-template').$.container.innerText, 'bar')
        })
        test('should have directive evaluated on a submitted form', function () {
          const form = fixture('TangyTemplateDirectiveFixture');
          form.newResponse()
          form.querySelector('#item1').shadowRoot.querySelector('dom-if').render()
          form.querySelector('#item1').querySelector('[name="input1"]').value = '2'
          form.querySelector('#item1').shadowRoot.querySelector('#next').click()
          form.querySelector('#item2').shadowRoot.querySelector('dom-if').render()
          form.querySelector('#item2').shadowRoot.querySelector('#complete').click()
          form.querySelector('#item2').shadowRoot.querySelector('dom-if').render();
          form.querySelector('#item2').shadowRoot.querySelector('#open').click()
          form.querySelector('#item2').shadowRoot.querySelector('dom-if').render();
          assert.equal(form.querySelector('#item2').querySelector('[name="template1"]').hasAttribute('skipped'), true)
          assert.equal(form.querySelector('#item2').querySelector('[name="template2"]').hasAttribute('skipped'), false)
        })
      })
