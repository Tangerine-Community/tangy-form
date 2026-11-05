// Option images and option layouts on tangy-radio-buttons, tangy-radio-blocks and tangy-checkboxes.
//
// - <option image="..."> shows a picture on checkboxes, as it already does on radio blocks. Radio
//   buttons take no image: single choice with pictures is what radio blocks are for. Its size comes from --tangy-option-image-width / --tangy-option-image-height
//   (default 50px, the size radio blocks have always used).
// - layout="wrap|squares|fit" on the group arranges the options; no layout keeps today's look.
import { fixture, registerFixture, installFixtureTeardown, assert } from './karma-fixture.js';
import '../input/tangy-radio-buttons.js'
import '../input/tangy-radio-blocks.js'
import '../input/tangy-checkboxes.js'

// A 200x200 picture, so any rendered size below 200 is the cap at work.
const IMG = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#4DCB97"/></svg>')
const BIG = 'style="--tangy-option-image-width:80px;--tangy-option-image-height:80px"'

const frames = (n = 2) => new Promise((resolve) => {
  const step = () => (--n <= 0 ? resolve() : requestAnimationFrame(step))
  requestAnimationFrame(step)
})
const loaded = async (img) => { if (!img.complete) await new Promise((r) => img.addEventListener('load', r, { once: true })) }
const items = (group, tag) => [...group.shadowRoot.querySelectorAll(tag)]

registerFixture('RadioWithImage', `
  <tangy-radio-buttons name="status"><option value="1" image="${IMG}">Present</option></tangy-radio-buttons>`)
// No image, and the empty values an editor round trip can write.
const NO_IMAGE = `<option value="a">None</option><option value="b" image="">Empty</option>
  <option value="c" image="null">Null</option><option value="d" image="undefined">Undefined</option>`
registerFixture('CheckboxesNoImage', `<tangy-checkboxes name="n">${NO_IMAGE}</tangy-checkboxes>`)
registerFixture('BlocksNoImage', `<tangy-radio-blocks name="n">${NO_IMAGE}</tangy-radio-blocks>`)
registerFixture('BlockImageDefault', `
  <tangy-radio-blocks name="status"><option value="1" image="${IMG}">Present</option></tangy-radio-blocks>`)
registerFixture('BlockImageBig', `
  <tangy-radio-blocks name="status" ${BIG}><option value="1" image="${IMG}">Present</option></tangy-radio-blocks>`)
registerFixture('CheckboxImageBig', `
  <tangy-checkboxes name="reasons" ${BIG}><option value="1" image="${IMG}">Sick</option></tangy-checkboxes>`)

const PERMISSION = `
  <option value="1">Class teacher</option>
  <option value="2">Senior woman teacher</option>
  <option value="3">Deputy principal</option>
  <option value="4">Other teacher</option>`
registerFixture('RadioList', `<div style="width:360px"><tangy-radio-buttons name="p">${PERMISSION}</tangy-radio-buttons></div>`)
registerFixture('RadioWrap', `<div style="width:360px"><tangy-radio-buttons name="p" layout="wrap">${PERMISSION}</tangy-radio-buttons></div>`)
registerFixture('RadioSquares', `<div style="width:360px"><tangy-radio-buttons name="p" layout="squares">${PERMISSION}</tangy-radio-buttons></div>`)
registerFixture('RadioFit', `<div style="width:360px"><tangy-radio-buttons name="s" layout="fit">
  <option value="1">Present</option><option value="2">Absent</option><option value="3">Left early, called home</option>
</tangy-radio-buttons></div>`)
registerFixture('BlocksWrap', `<div style="width:360px"><tangy-radio-blocks name="p" layout="wrap">${PERMISSION}</tangy-radio-blocks></div>`)
registerFixture('CheckboxesWrap', `<div style="width:360px"><tangy-checkboxes name="p" layout="wrap">${PERMISSION}</tangy-checkboxes></div>`)

registerFixture('BlocksFitImages', `<div style="width:360px"><tangy-radio-blocks name="s" layout="fit"
    style="--tangy-option-image-width:32px;--tangy-option-image-height:32px">
  <option value="1" image="${IMG}">Present</option><option value="2" image="${IMG}">Absent</option>
  <option value="3" image="${IMG}">Left early</option>
</tangy-radio-blocks></div>`)

// Line boxes the label's own text occupies inside a radio button.
const labelLines = (block) => {
  const label = block.shadowRoot.querySelector('#radio-block-label')
  const text = [...label.childNodes].find((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim())
  const range = document.createRange()
  range.selectNodeContents(text)
  return new Set([...range.getClientRects()].map((r) => Math.round(r.top))).size
}

suite('option images', () => {
  installFixtureTeardown()

  test('radio buttons ignore an option image', async () => {
    const group = fixture('RadioWithImage')
    const button = items(group, 'tangy-radio-button')[0]
    assert.isNull(button.shadowRoot.querySelector('img'))
    assert.isNull(button.getAttribute('image'))
  })

  test('a checkbox with no image, or an empty/"null"/"undefined" one, shows no picture and saves nothing new', async () => {
    const group = fixture('CheckboxesNoImage')
    await frames()
    items(group, 'tangy-checkbox').forEach((box) => {
      const img = box.shadowRoot.querySelector('img.option-image')
      assert.equal(getComputedStyle(img).display, 'none', `${box.name} shows a picture`)
      assert.isNotOk(img.getAttribute('src'), `${box.name} has src=${img.getAttribute('src')}`)
      assert.notProperty(box.getProps(), 'image', `${box.name} saves an image`)
    })
    assert.deepEqual(group.value.map((v) => v.value), ['', '', '', ''])
  })

  test('a radio block with no image, or an empty/"null"/"undefined" one, renders no picture and saves image as ""', async () => {
    const group = fixture('BlocksNoImage')
    await frames()
    items(group, 'tangy-radio-block').forEach((block) => {
      assert.isNull(block.shadowRoot.querySelector('#blockImage'), `${block.name} renders a picture`)
      assert.strictEqual(block.getProps().image, '', `${block.name} saves image=${block.getProps().image}`)
    })
    assert.deepEqual(group.value.map((v) => v.value), ['', '', '', ''])
  })

  test('a radio block image keeps its 50px default', async () => {
    const group = fixture('BlockImageDefault')
    const img = items(group, 'tangy-radio-block')[0].shadowRoot.querySelector('#blockImage')
    await loaded(img)
    assert.equal(img.getBoundingClientRect().width, 50)
  })

  test('a radio block image follows --tangy-option-image-width/height', async () => {
    const group = fixture('BlockImageBig')
    const img = items(group, 'tangy-radio-block')[0].shadowRoot.querySelector('#blockImage')
    await loaded(img)
    assert.equal(img.getBoundingClientRect().width, 80)
  })

  test('a checkbox option shows its image at the configured size', async () => {
    const group = fixture('CheckboxImageBig')
    const img = items(group, 'tangy-checkbox')[0].shadowRoot.querySelector('img.option-image')
    assert.ok(img, 'no <img class="option-image"> in the checkbox')
    await loaded(img)
    assert.equal(img.getBoundingClientRect().width, 80)
  })
})

suite('option layouts', () => {
  installFixtureTeardown()

  test('no layout keeps one option per row', async () => {
    const group = fixture('RadioList').firstElementChild
    await frames()
    const tops = items(group, 'tangy-radio-button').map((b) => b.getBoundingClientRect().top)
    assert.isBelow(tops[0], tops[1])
    assert.isBelow(tops[1], tops[2])
  })

  test('wrap puts options side by side, each sized to its words, wrapping onto new rows', async () => {
    const group = fixture('RadioWrap').firstElementChild
    await frames()
    const boxes = items(group, 'tangy-radio-button').map((b) => b.getBoundingClientRect())
    const rows = new Set(boxes.map((r) => Math.round(r.top)))
    assert.isAbove(rows.size, 1, 'options never wrapped')
    assert.isBelow(rows.size, boxes.length, 'options are still one per row')
    assert.notEqual(Math.round(boxes[0].width), Math.round(boxes[1].width), 'options are not sized to their words')
  })

  test('squares makes every option an equal square tile', async () => {
    const group = fixture('RadioSquares').firstElementChild
    await frames()
    const boxes = items(group, 'tangy-radio-button').map((b) => b.getBoundingClientRect())
    boxes.forEach((r) => {
      assert.approximately(r.width, boxes[0].width, 1)
      assert.approximately(r.height, r.width, 1)
    })
    assert.isAbove(new Set(boxes.map((r) => Math.round(r.left))).size, 1, 'tiles are not side by side')
  })

  test('fit gives every option the same width and one shared font size that fits the longest label', async () => {
    const group = fixture('RadioFit').firstElementChild
    await frames(3)
    const buttons = items(group, 'tangy-radio-button')
    const boxes = buttons.map((b) => b.getBoundingClientRect())
    boxes.forEach((r) => assert.approximately(r.width, boxes[0].width, 1))
    assert.equal(new Set(boxes.map((r) => Math.round(r.top))).size, 1, 'fit options are not on one row')
    const sizes = buttons.map((b) => getComputedStyle(b).fontSize)
    assert.equal(new Set(sizes).size, 1, `font sizes differ: ${sizes}`)
    assert.isBelow(parseFloat(sizes[0]), parseFloat(getComputedStyle(group).fontSize), 'font was not shrunk')
    buttons.forEach((b) => assert.isAtMost(b.scrollWidth, b.clientWidth, 'a label still overflows'))
  })

  test('fit leaves room for option images, keeping each label on one line', async () => {
    const group = fixture('BlocksFitImages').firstElementChild
    const blocks = items(group, 'tangy-radio-block')
    await Promise.all(blocks.map((b) => loaded(b.shadowRoot.querySelector('#blockImage'))))
    await frames(3)
    blocks.forEach((b) => assert.equal(labelLines(b), 1, `"${b.textContent.trim()}" wrapped`))
  })

  test('radio blocks show their box in a layout before anything is selected', async () => {
    const group = fixture('BlocksWrap').firstElementChild
    await frames()
    const label = items(group, 'tangy-radio-block')[0].shadowRoot.querySelector('#radio-block-label')
    assert.notEqual(getComputedStyle(label).borderTopColor, 'rgba(0, 0, 0, 0)')
  })

  test('radio blocks in fit stay inside the group', async () => {
    const group = fixture('BlocksFitImages').firstElementChild
    await frames(3)
    const right = group.shadowRoot.querySelector('.options').getBoundingClientRect().right
    items(group, 'tangy-radio-block').forEach((b) => {
      const label = b.shadowRoot.querySelector('#radio-block-label')
      assert.isAtMost(label.getBoundingClientRect().right, right + 0.5, `"${b.textContent.trim()}" sticks out`)
    })
  })

  test('tapping the empty space of a radio button box selects it', async () => {
    const group = fixture('RadioWrap').firstElementChild
    await frames()
    const button = items(group, 'tangy-radio-button')[1]
    button.click() // lands on the box itself, not on the label or image
    assert.equal(button.value, 'on')
  })

  test('tapping the empty space of a checkbox box checks it, and a second tap unchecks it', async () => {
    const group = fixture('CheckboxesWrap').firstElementChild
    await frames()
    const box = items(group, 'tangy-checkbox')[0]
    box.click()
    assert.equal(box.value, 'on')
    box.click()
    assert.equal(box.value, '')
  })

  test('a selected option keeps today\'s green border', async () => {
    const group = fixture('RadioWrap').firstElementChild
    await frames()
    const button = items(group, 'tangy-radio-button')[0]
    button.value = 'on'
    assert.equal(getComputedStyle(button).borderTopColor, 'rgb(0, 128, 0)')
  })

  test('checkboxes in a layout hide the tick box and keep every selection marked', async () => {
    const group = fixture('CheckboxesWrap').firstElementChild
    await frames()
    const [a, b, c] = items(group, 'tangy-checkbox')
    const tick = a.shadowRoot.querySelector('paper-checkbox').shadowRoot.querySelector('#checkboxContainer')
    assert.equal(getComputedStyle(tick).display, 'none')
    a.click()
    b.click()
    assert.deepEqual([a.value, b.value, c.value], ['on', 'on', ''])
    assert.equal(getComputedStyle(a).borderTopColor, 'rgb(0, 128, 0)')
    assert.equal(getComputedStyle(b).borderTopColor, 'rgb(0, 128, 0)')
    assert.notEqual(getComputedStyle(c).borderTopColor, 'rgb(0, 128, 0)')
  })

  test('a selected option is marked with its own border colour in a layout', async () => {
    const group = fixture('RadioWrap').firstElementChild
    await frames()
    const [first, second] = items(group, 'tangy-radio-button')
    first.value = 'on'
    assert.notEqual(getComputedStyle(first).borderTopColor, getComputedStyle(second).borderTopColor)
  })

  test('radio blocks wrap too', async () => {
    const group = fixture('BlocksWrap').firstElementChild
    await frames()
    const rows = new Set(items(group, 'tangy-radio-block').map((b) => Math.round(b.getBoundingClientRect().top)))
    assert.isAbove(rows.size, 1, 'blocks never wrapped')
    assert.isBelow(rows.size, 4, 'blocks are one per row')
  })

  test('checkboxes wrap too', async () => {
    const group = fixture('CheckboxesWrap').firstElementChild
    await frames()
    const rows = new Set(items(group, 'tangy-checkbox').map((b) => Math.round(b.getBoundingClientRect().top)))
    assert.isAbove(rows.size, 1, 'checkboxes never wrapped')
    assert.isBelow(rows.size, 4, 'checkboxes are one per row')
  })
})

// A required question answered with nothing must not print "undefined" or "null" anywhere,
// whether or not it was given a label, hint or error text, and with or without a layout.
const BARE = '<option value="1">One</option><option value="2">Two</option>'
;['tangy-radio-buttons', 'tangy-radio-blocks', 'tangy-checkboxes'].forEach((tag) => {
  ;['', ' layout="wrap"'].forEach((layout) => {
    registerFixture(`Bare ${tag}${layout}`, `<${tag} name="q" required${layout}>${BARE}</${tag}>`)
  })
})

suite('no "undefined" or "null" on screen', () => {
  installFixtureTeardown()
  ;['tangy-radio-buttons', 'tangy-radio-blocks', 'tangy-checkboxes'].forEach((tag) => {
    ;['', ' layout="wrap"'].forEach((layout) => {
      test(`${tag}${layout}: required, empty, no label/hint/error text`, async () => {
        const group = fixture(`Bare ${tag}${layout}`)
        await frames()
        assert.isFalse(group.validate())
        await frames()
        const shown = (root) => [...root.querySelectorAll('*')].map((el) =>
          (el.shadowRoot ? shown(el.shadowRoot) : '') + [...el.childNodes].filter((n) => n.nodeType === Node.TEXT_NODE).map((n) => n.textContent).join(' ')).join(' ')
        const text = shown(group.shadowRoot)
        assert.notMatch(text, /\bundefined\b/, text)
        assert.notMatch(text, /\bnull\b/, text)
      })
    })
  })
})

// image-display="top|fill" on radio blocks and checkboxes. Off = today's look (image beside the text).
//   top   picture above its centred label
//   fill  picture covers the whole tile; the text is hidden on screen but stays for screen readers and
//         the saved value; an option with no picture shows its text; once one is chosen the rest fade a little
const TRANSPORT = `<option value="walk" image="${IMG}">Walked</option>
  <option value="bike" image="${IMG}">Bicycle</option><option value="bus" image="${IMG}">Bus</option>`
const imageDisplay = (name, tag, layout, display, options = TRANSPORT) => registerFixture(name,
  `<div style="width:360px"><${tag} name="t" layout="${layout}" image-display="${display}">${options}</${tag}></div>`)
imageDisplay('BlocksTop', 'tangy-radio-blocks', 'squares', 'top')
imageDisplay('CheckboxesTop', 'tangy-checkboxes', 'squares', 'top')
imageDisplay('BlocksFillSquares', 'tangy-radio-blocks', 'squares', 'fill')
imageDisplay('BlocksFillFit', 'tangy-radio-blocks', 'fit', 'fill')
imageDisplay('CheckboxesFill', 'tangy-checkboxes', 'squares', 'fill')
imageDisplay('BlocksFillMissingImage', 'tangy-radio-blocks', 'squares', 'fill',
  `<option value="walk" image="${IMG}">Walked</option><option value="other">Other</option>`)

const rectOf = (node) => { const r = document.createRange(); r.selectNodeContents(node); return r.getBoundingClientRect() }
const blockText = (b) => rectOf([...b.shadowRoot.querySelector('#radio-block-label').childNodes]
  .find((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim()))
const boxText = (c) => rectOf(c.shadowRoot.querySelector('#checkbox-text'))
const imgOf = (el) => el.shadowRoot.querySelector('#blockImage, #optionImage')
const centre = (r) => r.left + r.width / 2
const settled = async (group, tag) => {
  const els = items(group, tag)
  await Promise.all(els.map((el) => imgOf(el) && loaded(imgOf(el))))
  await frames(3)
  return els
}

suite('image display', () => {
  installFixtureTeardown()

  test('no image-display keeps a radio block image beside its text', async () => {
    const [block] = await settled(fixture('BlockImageDefault'), 'tangy-radio-block')
    assert.isAtLeast(imgOf(block).getBoundingClientRect().left, blockText(block).right - 1)
  })

  test('top puts a radio block image above its centred label', async () => {
    const blocks = await settled(fixture('BlocksTop').firstElementChild, 'tangy-radio-block')
    blocks.forEach((b) => {
      const img = imgOf(b).getBoundingClientRect()
      const text = blockText(b)
      assert.isAtMost(img.bottom, text.top + 1, `"${b.textContent.trim()}" image is not above the text`)
      assert.approximately(centre(img), centre(text), 2, `"${b.textContent.trim()}" image is not centred`)
    })
  })

  test('top puts a checkbox image above its centred label', async () => {
    const boxes = await settled(fixture('CheckboxesTop').firstElementChild, 'tangy-checkbox')
    boxes.forEach((c) => {
      const img = imgOf(c).getBoundingClientRect()
      const text = boxText(c)
      assert.isAtMost(img.bottom, text.top + 1, `"${c.textContent.trim()}" image is not above the text`)
      assert.approximately(centre(img), centre(text), 2, `"${c.textContent.trim()}" image is not centred`)
    })
  })

  const assertFills = (tile, img, name) => {
    const r = img.getBoundingClientRect()
    assert.isAtLeast(r.width, tile.clientWidth - 1, `"${name}" picture is narrower than its tile`)
    assert.isAtLeast(r.height, tile.clientHeight - 1, `"${name}" picture is shorter than its tile`)
    assert.approximately(tile.clientWidth, tile.clientHeight, 2, `"${name}" tile is not square`)
  }

  test('fill: a radio block picture covers its whole square tile and the text is hidden but kept', async () => {
    const blocks = await settled(fixture('BlocksFillSquares').firstElementChild, 'tangy-radio-block')
    blocks.forEach((b) => {
      assertFills(b.shadowRoot.querySelector('#radio-block-label'), imgOf(b), b.textContent.trim())
      assert.equal(blockText(b).width, 0, `"${b.textContent.trim()}" text still shows`)
    })
    assert.equal(blocks[0].textContent.trim(), 'Walked')
  })

  test('fill in fit: pictures cover their tiles, all on one row', async () => {
    const blocks = await settled(fixture('BlocksFillFit').firstElementChild, 'tangy-radio-block')
    blocks.forEach((b) => assertFills(b.shadowRoot.querySelector('#radio-block-label'), imgOf(b), b.textContent.trim()))
    assert.equal(new Set(blocks.map((b) => Math.round(b.getBoundingClientRect().top))).size, 1)
  })

  test('fill: a checkbox picture covers its whole tile, with no tick box and no text on screen', async () => {
    const boxes = await settled(fixture('CheckboxesFill').firstElementChild, 'tangy-checkbox')
    boxes.forEach((c) => {
      assertFills(c, imgOf(c), c.textContent.trim())
      assert.equal(boxText(c).width, 0, `"${c.textContent.trim()}" text still shows`)
    })
  })

  test('fill: an option with no picture shows its text instead', async () => {
    const [walk, other] = await settled(fixture('BlocksFillMissingImage').firstElementChild, 'tangy-radio-block')
    assert.equal(blockText(walk).width, 0)
    assert.isAbove(blockText(other).width, 0)
  })

  test('fill: once a radio block is chosen the other pictures fade a little', async () => {
    const blocks = await settled(fixture('BlocksFillSquares').firstElementChild, 'tangy-radio-block')
    blocks.forEach((b) => assert.equal(getComputedStyle(b).opacity, '1'))
    blocks[1].shadowRoot.querySelector('#radio-block-label').click()
    assert.deepEqual(blocks.map((b) => getComputedStyle(b).opacity), ['0.7', '1', '0.7'])
    assert.equal(getComputedStyle(blocks[1].shadowRoot.querySelector('#radio-block-label')).borderTopColor, 'rgb(0, 128, 0)')
  })

  test('fill: chosen checkboxes stay clear, the rest fade a little', async () => {
    const boxes = await settled(fixture('CheckboxesFill').firstElementChild, 'tangy-checkbox')
    boxes[0].click()
    boxes[2].click()
    assert.deepEqual(boxes.map((c) => getComputedStyle(c).opacity), ['1', '0.7', '1'])
  })

  test('image-display is not saved with the answer', async () => {
    const group = fixture('BlocksFillSquares').firstElementChild
    await settled(group, 'tangy-radio-block')
    assert.notMatch(JSON.stringify(group.value), /image-?display/i)
  })
})

// An editor round trip can write label="undefined", error-text="null" and so on. Those are not text
// a form author wrote, so none of them may reach the screen.
const shownText = (root) => [...root.querySelectorAll('*')].map((el) =>
  (el.shadowRoot ? shownText(el.shadowRoot) : '') + [...el.childNodes].filter((n) => n.nodeType === Node.TEXT_NODE).map((n) => n.textContent).join(' ')).join(' ')
;['undefined', 'null'].forEach((junk) => {
  const attrs = ['label', 'hint-text', 'error-text', 'warn-text', 'discrepancy-text', 'question-number']
    .map((a) => `${a}="${junk}"`).join(' ')
  ;['tangy-radio-buttons', 'tangy-radio-blocks', 'tangy-checkboxes'].forEach((tag) => {
    registerFixture(`Junk ${junk} ${tag}`, `<${tag} name="q" required ${attrs}>
      <option value="1" hint-text="${junk}">One</option><option value="2">Two</option></${tag}>`)
  })
})

suite('no "undefined" or "null" text from an editor round trip', () => {
  installFixtureTeardown()
  ;['undefined', 'null'].forEach((junk) => {
    ;['tangy-radio-buttons', 'tangy-radio-blocks', 'tangy-checkboxes'].forEach((tag) => {
      test(`${tag}: label, hint, error, warning, discrepancy and question number set to "${junk}" show nothing`, async () => {
        const group = fixture(`Junk ${junk} ${tag}`)
        await frames()
        assert.isFalse(group.validate())
        group.hasWarning = true
        group.hasDiscrepancy = true
        await frames()
        const text = shownText(group.shadowRoot)
        assert.include(text, 'One', 'the options themselves must still show')
        const found = text.split(/\s+/).filter((word) => word === junk)
        assert.isEmpty(found, `"${junk}" is on screen`)
      })
    })
  })
})
