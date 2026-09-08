// Ported from test/tangy-select_test.html (web-component-tester) by scratchpad/port-wct-tests.js.
// Assertions are the originals, unchanged. Only the fixture plumbing is new.
import { fixture, registerFixture, installFixtureTeardown, assert } from './karma-fixture.js';

registerFixture('TangySelectFixture', `
<tangy-select name="foo" label="This is a label">
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
        </tangy-select>
`);

registerFixture('TangySelectValueSetFixture', `
<tangy-select name="foo" label="This is a label" value="b">
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
        </tangy-select>
`);

registerFixture('DynamicTangySelectFixture', `
<tangy-select name="foo" label="This is a label">
          <option value="a">A</option>
          <option value="b">B</option>
        </tangy-select>
`);

registerFixture('TangySelectWithMarkupFixture', `
<tangy-select name="foo" label="This is a <b>bold label</b>">
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
        </tangy-select>
`);

registerFixture('TranslatablePlaceholderFixture', `
<tangy-select name="foo" placeholder="<t-lang en>Hello</t-lang><t-lang fr>Bonjour</t-lang>">
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
        </tangy-select>
`);

import * as Polymer from '../node_modules/@polymer/polymer/polymer-legacy.js'
      import '../input/tangy-input.js'
      suite('tangy-input', () => {
    installFixtureTeardown();

        test('should render options', () => {
          const element = fixture('TangySelectFixture')
          assert.equal(element.shadowRoot.querySelectorAll('option').length, 4)
        })

        test('should have value set on load', () => {
          const element = fixture('TangySelectValueSetFixture')
          const selectedIndex = element.shadowRoot.querySelector('select').selectedIndex
          const option = element.shadowRoot.querySelectorAll('option')[selectedIndex];
          assert.equal(option.getAttribute('value'), 'b')
        })

        test('should update after value set', (done) => {
          const element = fixture('TangySelectValueSetFixture')
          element.addEventListener('render', () => {
            const selectedIndex = element.shadowRoot.querySelector('select').selectedIndex
            const option = element.shadowRoot.querySelectorAll('option')[selectedIndex];
            assert.equal(option.getAttribute('value'), 'c')
            done()
          })
          element.value = 'c'
        })

        test('should disable', (done) => {
          const element = fixture('TangySelectFixture')
          element.setAttribute('disabled', true)
          element.addEventListener('render', () => {
            assert.equal(element.shadowRoot.querySelector('select').hasAttribute('disabled'), true)
            done()
          })
        })

        test('should have label with markup', () => {
          const element = fixture('TangySelectWithMarkupFixture')
          assert.equal(element.shadowRoot.querySelectorAll('label b').length, 1)
        })

        test('should add an option dynamically', (done) => {
          const element = fixture('DynamicTangySelectFixture');
          element.addEventListener('render', () => {
            assert.equal(element.shadowRoot.querySelectorAll('option').length, 4)
            done()
          })
          element.innerHTML = `
            ${element.innerHTML}
            <option value="c">C</option>
          `
        })

      })
