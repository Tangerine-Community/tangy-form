// The small part of web-component-tester the existing tests actually leaned on.
//
// WCT gave every test page a <test-fixture id="..."> element plus a global fixture(id) that
// stamped its <template> and tore it down afterwards. Karma serves plain modules with no such
// element, so a ported spec registers the same markup by id through registerFixture() and calls
// the same fixture(id) it always did. That is what lets the spec bodies port over verbatim.

import { assert } from 'chai';

const templates = new Map();
let stamped = [];

/** Register fixture markup under the id the original <test-fixture> used. */
export function registerFixture(id, html) {
  templates.set(id, html);
}

/**
 * Stamp a registered fixture into the document and return its first element.
 * Mirrors WCT's global fixture(): the element is live in the document — components measure
 * themselves, so a detached node would give every layout assertion zeroes — and is removed
 * after the test.
 */
export function fixture(id) {
  const html = templates.get(id);
  if (html === undefined) {
    throw new Error(
      `fixture('${id}') has no markup registered. Call registerFixture('${id}', '<...>') first.`
    );
  }
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.appendChild(host);
  stamped.push(host);
  return host.firstElementChild;
}

/** Remove everything stamped so far. Registered as a teardown by installFixtureTeardown(). */
export function clearFixtures() {
  stamped.forEach((host) => host.remove());
  stamped = [];
}

/**
 * Call once per spec file, inside the suite, so one test's element cannot be found by the next.
 * Mocha's TDD interface names this teardown().
 */
export function installFixtureTeardown() {
  teardown(clearFixtures);
}

/** Components settle asynchronously; the original tests waited with setTimeout. */
export function afterMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { assert };
