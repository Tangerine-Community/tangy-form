// Smoke coverage for the components that had no test file at all.
//
// Deliberately shallow: each one is registered, constructed, attached, and asked for its value.
// That is the floor, not a substitute for real per-component suites — but it is the difference
// between a component that throws on construction and one that does not, and none of these 13 had
// even that. Several want hardware (camera, microphone, geolocation) which headless Chrome does
// not grant, so a failure here is information about the component's behaviour when a permission is
// refused, which is exactly what a tablet with permissions denied does.
//
// Importers: none. karma.conf.cjs collects test/**/*.spec.js.

import {
  fixture,
  registerFixture,
  installFixtureTeardown,
  afterMs,
  assert,
} from './karma-fixture.js';

import '../input/tangy-box.js';
import '../input/tangy-prompt-box.js';
import '../input/tangy-toggle.js';
import '../input/tangy-toggle-button.js';
import '../input/tangy-radio-block.js';
import '../input/tangy-consent.js';
import '../input/tangy-qr.js';
import '../input/tangy-gps.js';
import '../input/tangy-acasi.js';
import '../input/tangy-audio-playback.js';
import '../input/tangy-audio-recording.js';
import '../input/tangy-audio-recording-nlp.js';
import '../input/tangy-video-capture.js';

// tag -> markup. Each carries the minimum a form would give it: a name, and options where the
// component is a chooser.
const COMPONENTS = {
  'tangy-box': '<tangy-box name="a_box"><p>inner</p></tangy-box>',
  'tangy-prompt-box': '<tangy-prompt-box name="a_prompt">prompt text</tangy-prompt-box>',
  'tangy-toggle': '<tangy-toggle name="a_toggle" label="On or off"></tangy-toggle>',
  'tangy-toggle-button': '<tangy-toggle-button name="a_toggle_button">word</tangy-toggle-button>',
  'tangy-radio-block':
    '<tangy-radio-block name="a_radio_block" value="one">choice one</tangy-radio-block>',
  'tangy-consent': '<tangy-consent name="a_consent" label="Do you consent?"></tangy-consent>',
  'tangy-qr': '<tangy-qr name="a_qr" label="Scan"></tangy-qr>',
  'tangy-gps': '<tangy-gps name="a_gps" label="Where"></tangy-gps>',
  'tangy-acasi':
    '<tangy-acasi name="an_acasi" label="Listen"><option value="yes">Yes</option><option value="no">No</option></tangy-acasi>',
  'tangy-audio-playback':
    '<tangy-audio-playback name="a_playback" label="Play"></tangy-audio-playback>',
  'tangy-audio-recording':
    '<tangy-audio-recording name="a_recording" label="Record"></tangy-audio-recording>',
  'tangy-audio-recording-nlp':
    '<tangy-audio-recording-nlp name="a_recording_nlp" label="Record"></tangy-audio-recording-nlp>',
  'tangy-video-capture': '<tangy-video-capture name="a_video" label="Film"></tangy-video-capture>',
};

Object.entries(COMPONENTS).forEach(([tag, markup]) => registerFixture(tag, markup));

suite('components with no prior test', () => {
  installFixtureTeardown();

  Object.keys(COMPONENTS).forEach((tag) => {
    suite(tag, () => {
      test('is registered as a custom element', () => {
        assert.isFunction(
          customElements.get(tag),
          `${tag} never called customElements.define, so a form using it renders a blank tag`
        );
      });

      test('constructs and attaches without throwing', async () => {
        const element = fixture(tag);
        await afterMs(500);
        assert.isTrue(element instanceof HTMLElement);
        assert.equal(element.tagName.toLowerCase(), tag);
      });

      test('builds a shadow root', async () => {
        const element = fixture(tag);
        await afterMs(500);
        assert.isNotNull(element.shadowRoot, `${tag} rendered nothing into a shadow root`);
      });

      test('keeps the name it was given', async () => {
        const element = fixture(tag);
        await afterMs(500);
        assert.equal(element.getAttribute('name'), COMPONENTS[tag].match(/name="([^"]+)"/)[1]);
      });

      test('answers for its value without throwing', async () => {
        const element = fixture(tag);
        await afterMs(500);
        // Reading .value is what tangy-form does when it serialises a response. A getter that
        // throws here takes the whole form down on save.
        const read = () => element.value;
        assert.doesNotThrow(read, `${tag}.value threw; tangy-form cannot serialise it`);
      });
    });
  });
});
