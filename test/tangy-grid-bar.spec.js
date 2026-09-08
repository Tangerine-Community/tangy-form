// The action bar shared by tangy-timed and tangy-untimed-grid: its controls, its status message,
// and the positioning the two grids are supposed to agree on.
//
// Kept in one file deliberately. Every assertion here is about PARITY between the two grids, and
// parity claims split across two files drift apart — that is exactly how the untimed grid ended up
// pinned 64px lower than the timed one while both "passed".

import {
  fixture,
  registerFixture,
  installFixtureTeardown,
  afterMs,
  assert,
} from './karma-fixture.js';

import '../input/tangy-untimed-grid.js';
import '../input/tangy-timed.js';

const OPTIONS = Array.from(
  { length: 9 },
  (_, i) => `<option value="w-${i}">word${i}</option>`
).join('');

registerFixture(
  'UntimedGrid',
  `<tangy-untimed-grid columns="3" name="untimed_grid">${OPTIONS}</tangy-untimed-grid>`
);
registerFixture(
  'UntimedGridDisabled',
  `<tangy-untimed-grid columns="3" name="untimed_grid" disabled>${OPTIONS}</tangy-untimed-grid>`
);
registerFixture(
  'UntimedGridLabels',
  `<tangy-untimed-grid columns="3" name="untimed_grid" show-labels>${OPTIONS}</tangy-untimed-grid>`
);
registerFixture(
  'TimedGrid',
  `<tangy-timed columns="3" name="timed_grid" duration="60">${OPTIONS}</tangy-timed>`
);

/** The <style> text of an element's shadow root, for asserting on declared CSS. */
function styleText(element) {
  return [...element.shadowRoot.querySelectorAll('style')].map((s) => s.textContent).join('\n');
}

suite('grid action bar', () => {
  installFixtureTeardown();

  suite('status message sizing', () => {
    // Both grids size the message off the same two variables, so one override in a form's CSS
    // reaches both. Hard-coded sizes here were what made the message tower over the grid.
    test('untimed grid sizes the status message from overridable variables', async () => {
      const element = fixture('UntimedGrid');
      await afterMs(500);
      const css = styleText(element);
      assert.include(css, '--tangy-grid-message-size, 0.8em');
      assert.include(css, '--tangy-grid-message-height, 1.2');
    });

    test('timed grid uses the same variables and the same defaults', async () => {
      const element = fixture('TimedGrid');
      await afterMs(500);
      const css = styleText(element);
      assert.include(css, '--tangy-grid-message-size, 0.8em');
      assert.include(css, '--tangy-grid-message-height, 1.2');
    });

    test('the message element the variables target actually exists', async () => {
      const element = fixture('UntimedGrid');
      await afterMs(500);
      assert.isNotNull(
        element.shadowRoot.querySelector('#statusMessage'),
        'no #statusMessage, so the variables style nothing'
      );
    });
  });

  suite('bar positioning parity', () => {
    // The untimed grid used to pin its fixed bar below a 64px app header while the timed grid
    // rode at the top of the viewport, so the same form showed the bar in two different places.
    test('neither grid declares a top offset the other lacks', async () => {
      const untimed = fixture('UntimedGrid');
      const timed = fixture('TimedGrid');
      await afterMs(500);
      const barTop = (css) => /#bar\s*\{[^}]*top:\s*([^;]+);/.exec(css);
      const untimedTop = barTop(styleText(untimed));
      const timedTop = barTop(styleText(timed));
      assert.isNotNull(untimedTop, 'untimed grid declares no #bar top');
      assert.isNotNull(timedTop, 'timed grid declares no #bar top');
      assert.equal(untimedTop[1].trim(), timedTop[1].trim());
    });

    test('both grids inset the bar by the same amount', async () => {
      const untimed = fixture('UntimedGrid');
      const timed = fixture('TimedGrid');
      await afterMs(500);
      const barRight = (css) => /#bar\s*\{[^}]*right:\s*([^;]+);/.exec(css);
      const untimedRight = barRight(styleText(untimed));
      const timedRight = barRight(styleText(timed));
      assert.isNotNull(untimedRight, 'untimed grid declares no #bar right');
      assert.isNotNull(timedRight, 'timed grid declares no #bar right');
      assert.equal(untimedRight[1].trim(), timedRight[1].trim());
      assert.equal(untimedRight[1].trim(), '30px');
    });

    test('the bar starts absolute, over its own grid rather than the viewport', async () => {
      const element = fixture('UntimedGrid');
      await afterMs(1500);
      const bar = element.shadowRoot.querySelector('#bar');
      assert.equal(bar.style.position, 'absolute');
    });

    test('an absolute bar carries no inline right, so the stylesheet governs', async () => {
      const element = fixture('UntimedGrid');
      await afterMs(1500);
      const bar = element.shadowRoot.querySelector('#bar');
      assert.equal(bar.style.right, '');
    });
  });

  suite('bar controls', () => {
    test('untimed grid offers MARK and LAST ATTEMPTED', async () => {
      const element = fixture('UntimedGrid');
      await afterMs(500);
      assert.isNotNull(element.shadowRoot.querySelector('#markButton'));
      assert.isNotNull(element.shadowRoot.querySelector('#lastAttemptedButton'));
    });

    test('showLabels is off unless asked for', async () => {
      const element = fixture('UntimedGrid');
      await afterMs(500);
      assert.isFalse(element.showLabels, 'a form that never set show-labels got labels anyway');
    });

    test('show-labels puts the text beside the icon', async () => {
      const element = fixture('UntimedGridLabels');
      await afterMs(500);
      assert.isTrue(element.showLabels);
      const markText = element.shadowRoot.querySelector('#markButton').textContent.trim();
      assert.notEqual(markText, '', 'show-labels set but the button carries no text');
    });

    test('a disabled grid hides the whole bar', async () => {
      const element = fixture('UntimedGridDisabled');
      await afterMs(500);
      const bar = element.shadowRoot.querySelector('#bar');
      assert.equal(getComputedStyle(bar).display, 'none');
    });
  });

  suite('modes', () => {
    test('a fresh grid is UNTOUCHED and says what to do', async () => {
      const element = fixture('UntimedGrid');
      await afterMs(500);
      assert.equal(element.mode, 'TANGY_UNTIMED_GRID_MODE_UNTOUCHED');
      assert.notEqual(element.statusMessage, '', 'no instruction shown on an untouched grid');
    });

    test('MARK moves the grid into mark mode', async () => {
      const element = fixture('UntimedGrid');
      await afterMs(500);
      element.onMarkClick();
      await afterMs(200);
      assert.equal(element.mode, 'TANGY_UNTIMED_GRID_MODE_MARK');
    });

    test('a disabled grid ignores MARK', async () => {
      const element = fixture('UntimedGridDisabled');
      await afterMs(500);
      const before = element.mode;
      element.onMarkClick();
      await afterMs(200);
      assert.equal(element.mode, before, 'a disabled grid changed mode on a click');
    });

    test('LAST ATTEMPTED highlights the final item when nothing is marked', async () => {
      const element = fixture('UntimedGrid');
      await afterMs(500);
      element.onLastAttemptedClick();
      await afterMs(200);
      const highlighted = element.value.filter((state) => state.highlighted);
      assert.equal(highlighted.length, 1);
      assert.equal(highlighted[0].name, element.value[element.value.length - 1].name);
    });

    test('a disabled grid ignores LAST ATTEMPTED', async () => {
      const element = fixture('UntimedGridDisabled');
      await afterMs(500);
      element.onLastAttemptedClick();
      await afterMs(200);
      assert.equal(
        element.value.filter((state) => state.highlighted).length,
        0,
        'a disabled grid highlighted an item on a click'
      );
    });
  });

  suite('reserved space above the grid', () => {
    // #info reserves the out-of-flow bar's height. Measured rather than guessed, so the
    // single-row untimed bar does not leave the two-row timed grid's gap.
    test('untimed grid reserves room for the bar it actually rendered', async () => {
      const element = fixture('UntimedGrid');
      await afterMs(1500);
      const info = element.shadowRoot.querySelector('#info');
      const barHeight = element.shadowRoot.querySelector('#bar').offsetHeight;
      const reserved = parseFloat(getComputedStyle(info).paddingTop);
      assert.isAbove(reserved, 0, 'nothing reserved, so the bar sits on the first grid row');
      assert.closeTo(reserved, barHeight + 6, 12);
    });
  });
});
