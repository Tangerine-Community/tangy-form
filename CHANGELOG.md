# CHANGELOG

## v3.10.0
- Include the `<t-lang>` web component by default for providing form translations. 
- Allow use of `<t-lang>` in `<tangy-select>` option labels.
- Allow HTML in tangy-input's label and hint text. Allow use of <t-lang> for translations in placeholder, innerLabel and error message.

## v3.9.1
- New `<tangy-template>` element evaluates a JS string literal in the context of tangy-form-item's `on-change`. 

## v3.8.0
- Add additional grid helper functions https://github.com/Tangerine-Community/tangy-form/pull/33

## v3.7.1
- Fix bug that was causing tall elements to get cut off.

## v3.7.0
- Fix TangyTimed.validate() to prevent getting stuck on non-required tangy-timed. 
- Add `placeholder` and `inner-label` attributes to tangy-input for overiding the default `Enter your response to above question here.`.

## v3.6.0
- New `<tangy-timed row-markers>` attribute allows you to mark entire rows on a grid. https://github.com/Tangerine-Community/Tangerine/issues/1333
- Fixed `<tangy-timed columns=4>` attribute. Some situations the columns would not add up correctly.
- Fixed automatic selection of last attempted when hitting auto-stop https://github.com/Tangerine-Community/Tangerine/issues/1327
- New `valid-if` attribute on all inputs enables ability to define custom validation logic per input. https://github.com/Tangerine-Community/Tangerine/issues/1319
- `on-change` now fires after invalid submit allowing for custom validation messages (see new example). https://github.com/Tangerine-Community/Tangerine/issues/1326
- Fix tangy-if setting Object.hidden to true having an affect via reflect to attribute. https://github.com/Tangerine-Community/Tangerine/issues/1330

## v3.5.0
- New `<tangy-qr>` input for capturing QR data. https://github.com/Tangerine-Community/tangy-form/pull/30
- New `hint-text` attribute you can add to most inputs. https://github.com/Tangerine-Community/tangy-form/pull/29
- New `auto-stop` attribute for `<tangy-timed>` will automatically stop if the first x number of attempts are marked. https://github.com/Tangerine-Community/tangy-form/pull/28


## v3.4.1
- Add convenience methods to disable inputs and item buttons - an easy way to display form results:
  - enableItemReadOnly() - disables the inputs in the form (disableItemReadOnly() to re-enable the inputs)
  - hideItemButtons() - hides the Open/Close buttons (showItemButtons() to show them again)

## v3.4.0
- `<tangy-location show-meta-data>` attribute now shows meta data about a location when selected. You can also add an inline JS template string. https://github.com/Tangerine-Community/tangy-form/pull/13#issuecomment-454157413

## v3.3.2
- Fix an bug in Loc.unflatten() where it would return an object with circular references.

## v3.3.1
- Optimize Loc helper methods to avoid callstack limits when working with large location lists.
- Fix tangy-checkbox applying of labels to no longer prevent markup from being used.

## v3.3.0
- Add `<tangy-list>` element for allowing users to currate lists of inputs in an item. This is an alternative to `<tangy-input-groups>` and may replace it in the future.

## v3.2.0
- Add `<tangy-checkboxes-dynamic>` input element for loading the options of tangy-checkboxes using a json file.

## v3.1.0
- New `<tangy-photo-capture>` input element for capturing photos on forms.
- Fix a bug where values set during on-open would be overridden with previous set values.
- Made safer resuming responses when the items in the form no longer match.
- EFTouch option positioning improvements.

## v3.0.0
- You no longer have to include all of the tangy input elements in your build. You define which ones you use by importing then individually. See README.md for more details.
- Overall code organization refactor. We now place input elements in the input folder, shared style files in the style folder, and some utilities in the util folder.
- Tests are no longer all in one file. They are split out into files that match up with their related components into a specific "suite". All suites can be run by starting with `npm start` and then opening `http://localhost:8081/test/`. Click on a suite and it will run just the tests for that suite. Handy when you are doing TDD and don't want to wait for other suites to run.
- tangy-form theme is now customizeable in your application. See README for details.

## v2.11.0
- `<tangy-form-item>` will now have a `is-dirty` attribute when it has changes that have not yet been saved.

## v2.9.0
- Added `<tangy-input-groups>` as an alternative to `<tangy-cards>`. We will deprecate tangy cards.

## v2.8.1
- Loc.filterById now includes decendents by default.

## v2.8.0
- New APIs: TangyFormResponseModel.inputs, TangyFormResponseModel.inputsByName, Loc.filterById, TangyLocation.filterBy
- You can now `<tangy-location filter-by="school1,school4"></tangy-location>` to limit what is available for selection.
- You can now `<tangy-location filter-by-global></tangy-location>` to limit what is available for selection when `window.tangyLocations` is defined.

## v2.7.0
- Add tangy-cards element for arbitrary number of input groups.

## v2.6.1
- Adjust position of `*` on required elements.

## v2.6.0
- Reduced whitespace to make forms more compact.

## v2.5.0
- tangy-timed controls now with smarter positioning for situations where it may be edited or multiple tangy-timed on one page.

## v2.4.2
- tangy-timed font sizes were too small. Increased to 1.5em.

## v2.4.1
- Fixed attributes for hiding things when using tangy-gps.

## v2.4.0
- Default primary color has been updated to match that of Tangerine Client.
- Tabs when selected are highlighted with secondary color to match behavior of Tangerine Client.

## v2.3.0
- Add support for min and max attributes on tangy-input.

## v2.2.8
- Fixed issue where XMLHttpRequests in cordova apps using CHCP would not use status code leading to tangy-location elements not loading correctly.
