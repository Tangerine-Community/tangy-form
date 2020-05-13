# CHANGELOG

## v4.13.1
- Make initial collecting of meta data of a tangy-form more safe to avoid race conditions of uninitialized tangy-form-item elements. 

## v4.13.0
- Add wct-browser-legacy back as it's no longer breaking npm install.
- Add TangyForm.unlock() API for unlocking a completed form response.
- Add improvements to TangyForm.getMeta() to ensure it delivers original state.

## v4.12.3
- Ensure that items in a tangy-list stack in rows not rows and columns.

## v4.12.2
- Fixes for importing sortable-list to make it compatible in more bundling environments.

## v4.12.1
- Changed package for sortable-list - a dependency for `<tangy-list>` - to newer version. 

## v4.12.0
- Add support for sorting items in a `<tangy-list>` https://github.com/Tangerine-Community/tangy-form/pull/131

## v4.11.5
- Fixes
  - Fix `Uncaught TypeError: Cannot read property '_' of undefined` error experienced in some build environments by removing the Underscore dependency.

## v4.11.4
- Fixes
  - Removed render observer from tangy-radio-buttons - should speed up loading. 
  
## v4.11.3
- Fixes
  - Removed logging of missing translation strings - this logging created too much clutter in the logs. 
  
## v4.11.2
- Fixes
  - Fixed Required inputs in a hidden tangy-input-group should not prevent going next [#1879](https://github.com/Tangerine-Community/Tangerine/issues/1879)

## v4.11.1
- Fixes
  - Fixed Form Response should not save on every keystroke, causes performance issues [#1918](https://github.com/Tangerine-Community/Tangerine/issues/1918)
  - Fixed cannot proceed in form with optional Partial Date. [#1882](https://github.com/Tangerine-Community/Tangerine/issues/1882)
  - Fixed Required inputs in a hidden tangy-input-group should not prevent going next [#1879](https://github.com/Tangerine-Community/Tangerine/issues/1879)
  
## v4.11.0
- New
  - Record item first Open times. [#118](https://github.com/Tangerine-Community/tangy-form/pull/118/)
  - Add TangyPartialDate.diff function to help with calculating relative times from partial dates. [#116](https://github.com/Tangerine-Community/tangy-form/pull/116)
- Fixes
  - Fix endUnixTime not showing up in csv. [#115](https://github.com/Tangerine-Community/tangy-form/pull/115)
  - If time runs out on grids, the last attempted item must not be marked automatically. [#114](https://github.com/Tangerine-Community/tangy-form/pull/114)

## v4.10.4
- Fix issue where skipped or hidden items would still take up space. This comes at the sacrifice of losing the animation. Until CSS support animating display none this we'll have to do without the animation.

## v4.10.3
- Fix issue causing inputs skipped and disabled to overlap other content.

## v4.10.2
- Fix issue causing markup to be pruned from tangy-template templates.
- Fix issue causing skipped inputs to be validated, thus blocking going next when they are required and empty in value. 

## v4.10.1
- Fix bug in tangy-template causing greater and less than expressions to become HTML encoded thus breaking templates.

## v4.10.0
- Add `dont-skip-if` attribute to complement `skip-if` attribute directive.

## v4.9.0
- Add `skip-if` attribute and helpers. Similar to `hide-if` and `inputHide()`, but resets value of input when applied.
  - Example: https://github.com/Tangerine-Community/tangy-form/blob/master/docs/cookbook.md#skip-a-question-based-on-input-in-another-question
  - PR: https://github.com/Tangerine-Community/tangy-form/pull/113
- Add support for `mutually-exclusive` attribute on options in tangy-checkboxes. When enabled on an option, when that option is selected it will remove any prior option selections. 
  - Example: https://github.com/Tangerine-Community/tangy-form/blob/master/docs/cookbook.md#indicate-a-mutually-exclusive-option-in-a-checkboxes-group-such-as-none-of-the-above
  - PR: https://github.com/Tangerine-Community/tangy-form/pull/112
  
## v4.8.1
- Add missing typings for TangyFormResponseModel for compatibility with TypeScript projects.

## v4.8.0
- Add support for attributes on all inputs: discrepancy-text, has-discrepancy, warn-text, has-warning.
  - PR: https://github.com/Tangerine-Community/tangy-form/pull/111
  - Issue: https://github.com/Tangerine-Community/Tangerine/issues/1760
- Fix: Ensure inputs in tangy-input-groups are validated.

## v4.7.1
- Fix bug in tangy-location resulting in bad behavior when not defining show-levels attribute.

## v4.7.0
- Add support for label attribute on `<tangy-location>`. 

## v4.6.3
- Fix TangyLocation.value setting from markup.

## v4.6.2
- Fix dynamic reassignment of TangyLocation.showLevels to make sure value is reset.

## v4.6.1
- On `<tangy-timed>` when using auto stop, return the property instead of the instead of the truthfulness of the value which is always false.

## v4.6.0
- Refactor for `<tangy-eftouch>`.
  - `<tangy-eftouch multi-select go-next-on-selection="2">` should become `<tangy-eftouch multi-select="2" go-next-on-selection>`. This allows for expanding functionality of being able to use multi-select without go-next-on-selection but still limit the number of choices the user can make minus the transition.
  - `no-corrections` has been deprecated for new `disable-after-selection` attribute. When used with `multi-select`, the number of selections are still limited by the setting on `multi-select`, but changing selection is not allowed.
  - The `required` attribute when used with `multi-select` will only require just one value selected. If you need form example 2 selections to be valid, you can combine `required-all multi-select="2"`. 
  - We have an API change where we used to have `TangyEftouch.value.selection` was sometimes a string when not using `multi-select` and then when using `multi-select`, is was an array of strings. Now `TangyEftouch.value.selection` will always be an array of strings.

## v4.5.4
- Fix extra white space around checkboxes https://github.com/Tangerine-Community/Tangerine/issues/1690

## v4.5.3
- Fix longstanding bug where nav bar when complete would show if no summary item.

## v4.5.2
- Fix 'selected value label' text in tangy-select and tangy-location when in dark mode.

## v4.5.1
- Use --primary-text-color variable in TangyPartialDate

## v4.5.0
- Add variables: --tangy-hint-text--font-size, --tangy-required-indicator--font-size, --tangy-required-indicator--font-size, --tangy-required-indicator--font-size, --tangy-form-item--background-color and dark-mode.html demo

## v4.4.1
- Fix CSS causing icons next/back icons to dissappear and also for next/back translations to overun.
- Fix translations for `<tangy-partial-date>`'s error message defaults.

## v4.4.0
- Add support for a `disable-if` attribute, similar to `show-if` but for disabling items.
- Fixes for `<tangy-input>` so that if disabled and required it does not block proceeing on a form. 
- Error logging functionality designed for editor use was blocking errors from the Javascript Console, this is now fixed.

## v4.3.9
- Add the property "value" when the row marker is clicked for each of the buttons - csv reports
    - PR: https://github.com/Tangerine-Community/tangy-form/pull/103

## v4.3.8
- fix auto-stop to enable revealing of hidden radio buttons when a correction is made.
    - Issue: https://github.com/Tangerine-Community/Tangerine/issues/1519
    - PR: https://github.com/Tangerine-Community/tangy-form/pull/102

## v4.3.7
- Fix missing indication that required field was not filled out. https://github.com/Tangerine-Community/Tangerine/issues/1701

## v4.3.6
- Fixed auto-stop for radio buttons bug bug. Limit hideInputsUponThreshhold to tangy-radio-buttons inputs. No longer need to call hideInputsUponThreshhold in on-change event when using incorrect-threshold in tangy-radio-buttons.
 - Issue: https://github.com/Tangerine-Community/Tangerine/issues/1519
 - PR: https://github.com/Tangerine-Community/tangy-form/pull/100

## v4.3.5
- In tangy-timed, ensure gitVarItemAtTime and gridVarTimeIntermediateCaptured is saved into the form response.

## v4.3.4
- Roll back rem setting in tangy-timed to em for button font size. 

## v4.3.3
- Vertical center for tangy-toggle-button contents / tangy-timed items. https://github.com/Tangerine-Community/tangy-form/commit/c677ffb2620343fa993509d875e6418ea6757205
- Fixes for saving and resuming `<tangy-checkboxes-dynamic>`. https://github.com/Tangerine-Community/tangy-form/pull/98

## v4.3.2
- Make oversized tangy-timed grids gracefully handle overflow with overflow scroll setting.

## v4.3.1
- Fix font setting for tangy-toggle-button font sizes in tangy-timed
- Check if captureItemAt is defined in tangy-timed.
- Fix use of no-correction on tangy-eftouch to not allow any selection after first.

## v4.3.0
- Features
  - Improvements and support on all inputs for `error-text`, `hint-text`, `question-number`, and  content translations.
    - Issue: https://github.com/Tangerine-Community/Tangerine/issues/1655
    - PR: https://github.com/Tangerine-Community/tangy-form/pull/88, https://github.com/Tangerine-Community/tangy-form/pull/86
  - Add support to `<tangy-qr>` for scanning data matrix codes.
    - Issue: https://github.com/Tangerine-Community/Tangerine/issues/1653
    - PR: https://github.com/Tangerine-Community/tangy-form/pull/87
  - New "Capture Item at N Seconds" feature for `<tangy-timed>` will prompt Data Collector to mark which item the child last read after a specific amount of time.
    - Issue: https://github.com/Tangerine-Community/Tangerine/issues/1586
    - PR: https://github.com/Tangerine-Community/tangy-form/pull/95
  - New `goTo('itemID')` helper function to navigate users to a specific item given some item level `on-change` logic.
    - Issue: https://github.com/Tangerine-Community/Tangerine/issues/1652
    - PR: https://github.com/Tangerine-Community/tangy-form/pull/92
  - New `<tangy-signature>` input for capturing signatures.
    - Issue: https://github.com/Tangerine-Community/Tangerine/issues/1656 
    - PR: https://github.com/Tangerine-Community/tangy-form/pull/90
  - Visibility of labels and/or icons on item navigation now configurable with `<tangy-form-item hide-nav-icons>` and `<tangy-form-item hide-nav-labels>`. 
    - Issue: https://github.com/Tangerine-Community/Tangerine/issues/1682 
    - PR: https://github.com/Tangerine-Community/tangy-form/pull/73
- Fixes
  - Fix performance issues caused by needless TangyForm.on-change events from firing when they don't need to.
    - Issue: https://github.com/Tangerine-Community/Tangerine/issues/1656
    - PR: https://github.com/Tangerine-Community/tangy-form/pull/89
  - Fix data collector reviews completed fullscreen form 
    - Issue: https://github.com/Tangerine-Community/Tangerine/issues/1629
    - PR: https://github.com/Tangerine-Community/tangy-form/pull/75
  - `<tangy-eftouch auto-progress>` now distinguishes between going next on the time limit and going next on a number of selections. The API is now `<tangy-eftouch go-next-on-selection=2>` for going next on 2 selection and `<tangy-eftouch go-next-on-time-limit>` for going next on the time limit. 
    - Issue: https://github.com/Tangerine-Community/Tangerine/issues/1597
    - PR: https://github.com/Tangerine-Community/tangy-form/pull/84
  - `<tangy-eftouch>` content is now more likely to fit above the fold, not overlap with content above it, be more consistent on smaller screens, and also adapt to screen size changes. 
    - Issue: https://github.com/Tangerine-Community/Tangerine/issues/1591, https://github.com/Tangerine-Community/Tangerine/issues/1587
    - PR: https://github.com/Tangerine-Community/tangy-form/pull/79
  - `<tangy-eftouch>` suffered from going to next item twice due to time limit and selection being made at in a close window. This is now fixed. 
    - Issue: https://github.com/Tangerine-Community/Tangerine/issues/1596
    - PR: https://github.com/Tangerine-Community/tangy-form/pull/76
  - Fix Partial Date validation and for disabled attribute not reflecting 
    - Issue: https://github.com/Tangerine-Community/Tangerine/issues/1683
    - PR: https://github.com/Tangerine-Community/tangy-form/pull/71

## v4.2.0
- Added the exit-clicks attribute to tangy-form and tangy-form-item, which is for the number of times a user must click the exit fullscreen button before that mode is deactivated. 

## v4.1.1
- Fix tangy-select test regression and work on EFTouch transition sound plays only on auto-progress [#137](https://github.com/Tangerine-Community/Tangerine/issues/1371)

## v4.1.0
- API change in tangy-select - use of secondaryLabel is supported but deprecated; Use optionSelectLabel instead. 
  
## v4.0.0
- Enable content of a form to be styled from the parent document. [#64](https://github.com/Tangerine-Community/tangy-form/pull/64)

  __Upgrade instructions__:
This is considered to be a major release because some users' forms would look into a form item's contents using `tangyFormItemEl.shadowRoot.querySelector(...)`. The contents of the form can now be accessed at `tangyFormItemEl.querySelector(...)`. If you have any use of `shadowRoot` in our form content, beware. The advantage of moving this content out of the shadow DOM is that you can now style it directly from your app.

## v3.23.0
- Add ability to reference inputs.NAME in valid-if attributes. [#65](https://github.com/Tangerine-Community/tangy-form/pull/65)

## v3.22.1
- Fix resuming a `<tangy-parial-date>` and use of boolean attributes. [#62](https://github.com/Tangerine-Community/tangy-form/pull/62)

## v3.22.0
- Add new `<tangy-partial-date>` input for capturing partial dates. See `demo/partial-date-demo.html` for a demo.

## v3.21.0
- Add support for distributing bundles in `dist/bundle.js`.

## v3.20.0
- Adding variables so that the select element may be styled. [#50](https://github.com/Tangerine-Community/tangy-form/pull/50)

## v3.19.0
- Add validate function to tangy-acasi input in order to enable 'required' feature.

## v3.18.0
- Add support for autostop in tangy-radio-buttons and path changes for the tangy-acasi widget [#49](https://github.com/Tangerine-Community/tangy-form/pull/49)
  - Autostop is implemented by using the hideInputsUponThreshhold helper, which takes a tangy-form-item element and compares the number of correct radio button answers to the value in its incorrect-threshold attribute.
    
    Usage: `<tangy-form-item id="item1" incorrect-threshold="2">`
  - A new "correct" attribute has been added to tangy-list-item to store the correct value.
    
    Usage: 
    ```
    <tangy-radio-buttons name="fruit_selection2" label="What is your favorite fruit?">
      <option name="tangerine">Tangerine</option>
      <option name="cherry" correct>Cherry</option>
    </tangy-radio-buttons>
    ```

## v3.17.0
- Add support for eftouch multi-select attribute and multiple values of correct options [#48](https://github.com/Tangerine-Community/tangy-form/pull/48)

## v3.16.1
- Fix adding of `<option>` elements to `<tangy-select>` after first load. [#46](https://github.com/Tangerine-Community/tangy-form/pull/46)

## v3.16.0
- Exposed option-font-size attribute to tangy-timed and tangy-untimed.
  Usage: <tangy-timed required columns="3" duration=80 name="class1_term2" option-font-size="5">
  Sets the host font-size in tangy-toggle-button. using the --tangy-toggle-button-font-size custom CSS property.

## v3.15.1
- Fix bug that prevents tangy-form-item from validating when it has nested elements.

## v3.15.0
- Added `numberOfItemsAttempted`, `numberOfCorrectItems`, `numberOfIncorrectItems`, and `gridAutoStopped` to `exposeHelperFunctions`.

## v3.14.0
- Added `cancel` and `scanning` events to `<tangy-qr>`.

## v3.13.0
- Add safe eval of custom logic, error message notifications, and finally remove support for deprecated use of form tags. https://github.com/Tangerine-Community/tangy-form/pull/41
- Add new helper convention that if a tangy-form has a tangy-location input with a name of location, cache that data at FormResponse.location. https://github.com/Tangerine-Community/tangy-form/pull/41

## v3.12.2
- In some contexts, section is a more appropriate helper function term than item, and item is a more appropriate term than input. These are now available in corresponding places.
- A bug on tangy-input using type="number" was causing them to immediately become invalid when empty.

## v3.12.1
- Make more helper functions available to valid-if (More tests for tangy-if and valid-if [#38](https://github.com/Tangerine-Community/tangy-form/pull/38)).

## v3.12.0
- Add <tangy-consent> widget

## v3.11.0
- Add <tangy-untimed-grid> widget

## v3.10.2
- Fix infinite loop in tangy-input value setting that was causing other parts of tangy-form to quietly fail.
- Fix broken min and max validation for tangy-input, also type=date

## v3.10.1
- Fixed issue where some `hint-text` and `label` attributes with markup would show escaped.

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
