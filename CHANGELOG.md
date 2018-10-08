# CHANGELOG

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
