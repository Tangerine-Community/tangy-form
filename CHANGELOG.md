# CHANGELOG

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
- Loc.filterById now includes decendents by default

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
