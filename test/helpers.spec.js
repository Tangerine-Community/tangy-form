// Ported from test/helpers_test.html (web-component-tester) by scratchpad/port-wct-tests.js.
// Assertions are the originals, unchanged. Only the fixture plumbing is new.
import { fixture, registerFixture, installFixtureTeardown, assert } from './karma-fixture.js';

import { Get, Set } from '../helpers.js'
      import stub from './stub.js'

      suite('helpers', () => {
    installFixtureTeardown();
        test('Get should return value', () => {
          assert.equal(Get(stub.tangyFormResponse, 'input1'), 'Foo')
        })
        test('Get should behave as factory then get should return value', () => {
          const get = Get(stub.tangyFormResponse)
          assert.equal(get('input1'), 'Foo')
        })
        test('Set should return response with updated value', () => {
          const tangyFormResponseModel = Set(stub.tangyFormResponse, 'input1', 'Bar')
          assert.equal(tangyFormResponseModel.get('input1'), 'Bar')
        })
        test('Set should behave as factory then set should return response with updated value', () => {
          const set = Set(stub.tangyFormResponse)
          const tangyFormResponseModel = set('input1', 'Bar')
          assert.equal(tangyFormResponseModel.get('input1'), 'Bar')
        })
      })
