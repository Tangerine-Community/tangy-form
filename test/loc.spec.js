// Ported from test/loc_test.html (web-component-tester) by scratchpad/port-wct-tests.js.
// Assertions are the originals, unchanged. Only the fixture plumbing is new.
import { fixture, registerFixture, installFixtureTeardown, assert } from './karma-fixture.js';

import { Loc } from '../util/loc.js'
      import stub from './stub.js'
      import stubLocationList from './stub-location-list.js'


      suite('loc', () => {
    installFixtureTeardown();
        test('should flatten', () => {
          let flattenedLocationList = Loc.flatten(stub.locationList)
          assert.equal(flattenedLocationList.locations.length, 6)
          assert.equal(flattenedLocationList.locations.find(location => location.id === 'school1').level, 'school')
          assert.equal(flattenedLocationList.locations.find(location => location.id === 'county2').level, 'county')
        })
        test('should unflatten', () => {
          let flattenedLocationListDeepCopy = JSON.parse(JSON.stringify(Loc.flatten(stubLocationList)))
          let locationList = Loc.unflatten(flattenedLocationListDeepCopy)
          assert.equal(locationList.locations.county1.children.subcounty1.children.school1.id, 'school1')
          assert.equal(locationList.locations.county1.children.subcounty2.children.school5.id, 'school5')
        })
        test('should unflatten and stringify', () => {
          let locationList = Loc.unflatten(Loc.flatten(stub.locationList))
          let locationListJson = JSON.stringify(locationList)
          assert.equal(!!locationListJson, true)
        })
        test('should filter', () => {
          let locationList = Loc.filterById(stub.locationList, ['school1', 'school4'])
          assert.equal(locationList.locations.county2.children.school4.id, 'school4')
          assert.equal(locationList.locations.county2.children.hasOwnProperty('school3'), false)
        })
        test('should filter without decendents', () => {
          let locationList = Loc.filterById(stub.locationList, ['county1'], false)
          assert.equal(locationList.locations.hasOwnProperty('county2'), false)
          assert.equal(locationList.locations.county1.children.hasOwnProperty('school1'), false)
        })
        test('should filter with decendents', () => {
          let locationList = Loc.filterById(stub.locationList, ['county1'])
          assert.equal(locationList.locations.hasOwnProperty('county2'), false)
          assert.equal(locationList.locations.county1.children.hasOwnProperty('school1'), true)
        })
        test('should transform to include decendants counts', () => {
          let locationList = Loc.calculateDescendantCounts(stub.locationList)
          assert.equal(locationList.locations["county1"].descendantsCount, 2)
          assert.equal(locationList.locations["county1"].children.school1.descendantsCount, 0)
        })
      })
      test('should transform to include decendants counts and stringify', () => {
          let locationList = Loc.calculateDescendantCounts(stub.locationList)
          let locationListJson = JSON.stringify(locationList)
          assert.equal(!!locationListJson, true)
        })
