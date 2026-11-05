/* jshint esversion: 6 */

/*
 * Option layouts for tangy-radio-buttons, tangy-radio-blocks and tangy-checkboxes.
 *
 * Set layout="wrap|squares|fit" on the group. The group's option container carries class="options".
 * No layout (or layout="list") keeps the stacked look these inputs have always had.
 *
 *   wrap     each option sized to its words, side by side, wrapping onto new rows
 *   squares  equal square tiles, at least --tangy-option-tile-size (default 6.5rem) and grown to the
 *            widest option so no label is cut off; never wider than the group
 *   fit      equal boxes, all on one row; util/option-layout.js shrinks one shared font size
 *            until the longest label fits. Only fit changes the text size.
 *
 * Variables: --tangy-option-gap, --tangy-option-border-color, --tangy-option-selected-border-color,
 * --tangy-option-selected-background, --tangy-option-radius. Image size is
 * --tangy-option-image-width / --tangy-option-image-height, read by each option.
 * A group with columns="n" keeps its table and ignores layout. Radio blocks keep their orientation in
 * every layout: "columns" (default) side by side, "rows" one option per line.
 */

const $_documentStyleContainer = document.createElement('div');
$_documentStyleContainer.setAttribute('style', 'display: none;');

$_documentStyleContainer.innerHTML = `
  <dom-module id="tangy-option-layout-styles">
  <template>
  <style is="tangy-option-layout-styles">
    :host([layout="wrap"]) :is(.options, #blockContainer),
    :host([layout="squares"]) :is(.options, #blockContainer),
    :host([layout="fit"]) :is(.options, #blockContainer) {
      gap: var(--tangy-option-gap, 8px);
      height: auto;
      /* The radio circle is hidden in a layout; drop the gap it leaves before the label. */
      --paper-radio-button-label-spacing: 0;
      --tangy-radio-block-border-color: var(--tangy-option-border-color, #C9D3E4);
      --button-selected-border-color: var(--tangy-option-selected-border-color, green);
      --tangy-radio-block-margin: 0;
      --paper-checkbox-label-spacing: 0;
    }
    :host([layout="wrap"]) :is(.options, #blockContainer) {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: stretch;
      --width: auto;
      --height: auto;
    }
    :host([layout="squares"]) :is(.options, #blockContainer) {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, max(var(--tangy-option-tile-size, 6.5rem), var(--tangy-option-tile-need, 0px))), 1fr));
      --tangy-option-image-display: block;
      --width: 100%;
      --height: 100%;
    }
    :host([layout="fit"]) :is(.options, #blockContainer) {
      font-size: inherit;
      font-weight: inherit;
      --tangy-radio-block-font-size: 1em;
    }
    /* Radio blocks start fit from their own 2rem and shrink only when a label needs it. */
    :host([layout="fit"]) #blockContainer {
      font-size: 2rem;
      font-weight: 400;
    }
    :host([layout="fit"]) :is(.options, #blockContainer) {
      display: grid;
      grid-template-columns: repeat(var(--tangy-option-columns, 3), minmax(0, 1fr));
      --width: 100%;
      --tangy-option-image-display: block;
    }

    /* Radio blocks' orientation="rows" (class "columns") keeps one option per line in every layout;
       the layout still shapes each tile: wrap sized to its words, squares one column of equal
       squares, fit equal tiles across the full width. */
    :host([layout="wrap"]) #blockContainer.columns {
      align-items: flex-start;
    }
    :host([layout="squares"]) #blockContainer.columns {
      grid-template-columns: min(100%, max(var(--tangy-option-tile-size, 6.5rem), var(--tangy-option-tile-need, 0px)));
    }
    :host([layout="fit"]) #blockContainer.columns {
      grid-template-columns: minmax(0, 1fr);
    }
    :host([layout="wrap"]) #blockContainer.columns > tangy-radio-block {
      --width: auto;
      --height: auto;
    }
    :host([layout="squares"]) #blockContainer.columns > tangy-radio-block {
      --height: 100%;
    }
    :host([layout="wrap"]) #blockContainer.columns > tangy-radio-block,
    :host([layout="squares"]) #blockContainer.columns > tangy-radio-block,
    :host([layout="fit"]) #blockContainer.columns > tangy-radio-block {
      --justify-content: center;
      width: auto;
      margin: 0;
    }

    /* Radio buttons and checkboxes become bordered boxes; radio blocks already are. */
    :host([layout="wrap"]) .options > :is(tangy-radio-button, tangy-checkbox),
    :host([layout="squares"]) .options > :is(tangy-radio-button, tangy-checkbox),
    :host([layout="fit"]) .options > :is(tangy-radio-button, tangy-checkbox) {
      display: flex !important;
      align-items: center;
      box-sizing: border-box;
      min-width: 0;
      margin: 0 !important;
      padding: 4px 8px;
      border: 2px solid var(--tangy-option-border-color, #C9D3E4);
      border-radius: var(--tangy-option-radius, 10px);
      background: var(--tangy-option-background, #FFF);
    }
    :host([layout]) .options > :is(tangy-radio-button, tangy-checkbox)[value="on"] {
      border-color: var(--tangy-option-selected-border-color, green);
      background: var(--tangy-option-selected-background, var(--tangy-option-background, #FFF));
    }
    :host([layout="squares"]) .options > * {
      aspect-ratio: 1 / 1;
      overflow: hidden;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }
    :host([layout="fit"]) .options > * {
      justify-content: center;
      white-space: nowrap;
      overflow: hidden;
    }

    /* image-display="fill" (radio blocks, checkboxes): the picture reaches the tile edge, and once one
       is chosen the rest fade a little. ponytail: the fade needs :has (Chrome 105+); an older WebView
       skips it and the green border alone marks the choice. */
    :host([layout]) .options > [image-display="fill"] {
      padding: 0;
    }
    /* In wrap a picture tile would take the picture's own size; hold it to the squares tile. */
    :host([layout="wrap"][image-display="fill"]) :is(.options, #blockContainer) {
      --width: var(--tangy-option-tile-size, 6.5rem);
    }
    :host([layout="wrap"][image-display="fill"]) :is(.options, #blockContainer) > * {
      width: var(--tangy-option-tile-size, 6.5rem);
    }
    :host([image-display="fill"]) :is(.options, #blockContainer):has(> [value="on"]) > :not([value="on"]) {
      opacity: 0.7;
    }
  </style>
  </template>
  </dom-module>
`;

document.head.appendChild($_documentStyleContainer);
