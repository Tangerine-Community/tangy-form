// Ported from test/tangy-list_test.html (web-component-tester) by scratchpad/port-wct-tests.js.
// Assertions are the originals, unchanged. Only the fixture plumbing is new.
import { fixture, registerFixture, installFixtureTeardown, assert } from './karma-fixture.js';

registerFixture('TangyListFixture', `
<tangy-list initial-count=3 name="person">
          <template type="tangy-list/new-item">
            <tangy-input name="first_name" label="First name" required></tangy-input>
            <tangy-input name="last_name" label="Last name" required></tangy-input>
          </template>
        </tangy-list>
`);

registerFixture('TangyListInlineResumeFixture', `
<tangy-list initial-count="3" name="person">
          <template type="tangy-list/new-item">
            <tangy-input name="first_name" label="First name"></tangy-input>
            <tangy-input name="last_name" label="Last name"></tangy-input>
          </template>
          <template type="tangy-list/initial-items">
            <tangy-list-item>
              <tangy-input name="first_name" label="First name" value="Elaine"></tangy-input>
              <tangy-input name="last_name" label="Last name" value="Benes"></tangy-input>
            </tangy-list-item>
            <tangy-list-item>
              <tangy-input name="first_name" label="First name" value="Bob"></tangy-input>
              <tangy-input name="last_name" label="Last name" value="Costanza"></tangy-input>
            </tangy-list-item>
          </template>
        </tangy-list>
`);

registerFixture('TangyListWithCollapsedTemplateFixture', `
<tangy-list initial-count="3" name="person">
            <template type="tangy-list/collapsed-template">
              <div class="name">\${first_name} \${last_name}</div>
            </template>
            <template type="tangy-list/new-item">
              <tangy-input name="first_name" label="First name"></tangy-input>
              <tangy-input name="last_name" label="Last name"></tangy-input>
            </template>
            <template type="tangy-list/initial-items">
              <tangy-list-item>
                <tangy-input name="first_name" label="First name" value="Elaine"></tangy-input>
                <tangy-input name="last_name" label="Last name" value="Benes"></tangy-input>
              </tangy-list-item>
              <tangy-list-item>
                <tangy-input name="first_name" label="First name" value="Bob"></tangy-input>
                <tangy-input name="last_name" label="Last name" value="Costanza"></tangy-input>
              </tangy-list-item>
            </template>
          </tangy-list>
`);

import * as Polymer from '../node_modules/@polymer/polymer/polymer-legacy.js'
      import stub from './stub.js' 
      import '../tangy-form.js'
      import '../tangy-list.js'
      import '../input/tangy-input.js'

      suite('tangy-list', () => {
    installFixtureTeardown();
         test('start with 3 items', () => {
          const element = fixture('TangyListFixture');
          assert.equal(element.$.items.querySelectorAll('tangy-list-item').length, 3)
        });       
        test('add an item', () => {
          const element = fixture('TangyListFixture');
          element.shadowRoot.querySelector('.add-another').click()
          assert.equal(element.$.items.querySelectorAll('tangy-list-item').length, 4)
        });
        test('removes an item', () => {
          const element = fixture('TangyListFixture');
          element.$.items.querySelector('tangy-list-item').shadowRoot.querySelector('#remove').click()
          assert.equal(element.$.items.querySelectorAll('tangy-list-item').length, 2)
          assert.equal(element.value.length, 2)
        });
        test('resumes items given initial-items typed template', () => {
          const element = fixture('TangyListInlineResumeFixture');
          assert.equal(element.$.items.querySelectorAll('tangy-list-item').length, 2)
          assert.equal(element.value.length, 2)
        });
        test('resumes items given TangyList.value assignment', () => {
          const element = fixture('TangyListFixture');
          element.value = [
            [
              {
                "name": "first_name",
                "private": false,
                "label": "First name",
                "type": "",
                "errorMessage": "",
                "required": false,
                "disabled": false,
                "hidden": false,
                "invalid": false,
                "incomplete": true,
                "value": "Elaine",
                "allowedPattern": "",
                "min": "",
                "max": "",
                "tagName": "TANGY-INPUT"
              },
              {
                "name": "last_name",
                "private": false,
                "label": "Last name",
                "type": "",
                "errorMessage": "",
                "required": false,
                "disabled": false,
                "hidden": false,
                "invalid": false,
                "incomplete": true,
                "value": "Benes",
                "allowedPattern": "",
                "min": "",
                "max": "",
                "tagName": "TANGY-INPUT"
              }
            ],
            [
              {
                "name": "first_name",
                "private": false,
                "label": "First name",
                "type": "",
                "errorMessage": "",
                "required": false,
                "disabled": false,
                "hidden": false,
                "invalid": false,
                "incomplete": true,
                "value": "Bob",
                "allowedPattern": "",
                "min": "",
                "max": "",
                "tagName": "TANGY-INPUT"
              },
              {
                "name": "last_name",
                "private": false,
                "label": "Last name",
                "type": "",
                "errorMessage": "",
                "required": false,
                "disabled": false,
                "hidden": false,
                "invalid": false,
                "incomplete": true,
                "value": "Costanza",
                "allowedPattern": "",
                "min": "",
                "max": "",
                "tagName": "TANGY-INPUT"
              }
            ]
          ] 
          assert.equal(element.$.items.querySelectorAll('tangy-list-item')[0].querySelector('[name="first_name"]').value, 'Elaine')
          assert.equal(element.$.items.querySelectorAll('tangy-list-item')[1].querySelector('[name="first_name"]').value, 'Bob')
        });
        test('returns invalid when an input in an item returns invalid', () => {
          const element = fixture('TangyListFixture');
          assert.equal(element.validate(), false)
          // Test the opposite that it can also return true.
          element.$.items.querySelector('tangy-list-item').shadowRoot.querySelector('#remove').click()
          element.$.items.querySelector('tangy-list-item').shadowRoot.querySelector('#remove').click()
          element.$.items.querySelectorAll('tangy-list-item')[0].querySelector('[name="first_name"]').value = 'Elaine'
          element.$.items.querySelectorAll('tangy-list-item')[0].querySelector('[name="last_name"]').value = 'Benes'
          assert.equal(element.validate(), true)
        })
        test('shows list in collapsed templates')
      })
