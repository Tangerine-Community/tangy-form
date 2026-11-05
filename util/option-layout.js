// JS half of style/tangy-option-layout-styles.js: layout="fit" needs a measurement CSS cannot do.

const MIN_FONT_PX = 10

// An option's image URL, or null. An editor round trip can write image="", "null" or "undefined";
// none of those is a picture, and rendering one shows a broken-image icon.
export function optionImage(el) {
  const src = (el.getAttribute('image') || '').trim()
  return src && src !== 'null' && src !== 'undefined' ? src : null
}

let canvas

// One shared font size, the largest at which every label fits its box on one line (never below
// MIN_FONT_PX). Labels are measured as text: the inner paper elements wrap rather than overflow,
// so the boxes themselves never report an overflow to wait for.
export function fitOptions(container) {
  const options = [...container.children]
  if (!options.length || !container.isConnected) return
  container.style.setProperty('--tangy-option-columns', options.length <= 4 ? options.length : 3)
  container.style.fontSize = ''
  const style = getComputedStyle(container)
  const base = parseFloat(style.fontSize)
  const ctx = (canvas = canvas || document.createElement('canvas')).getContext('2d')
  ctx.font = `${style.fontWeight} ${base}px ${style.fontFamily}`
  let scale = 1
  for (const option of options) {
    const box = getComputedStyle(option)
    let room = option.clientWidth - parseFloat(box.paddingLeft) - parseFloat(box.paddingRight)
    // An image beside the label takes its share of the row; refit once it has loaded.
    const img = option.shadowRoot && option.shadowRoot.querySelector('img.option-image:not([hidden]), #blockImage')
    if (img) {
      if (!img.complete) img.addEventListener('load', () => fitOptions(container), { once: true })
      const imgBox = getComputedStyle(img)
      if (imgBox.display !== 'block') room -= img.getBoundingClientRect().width + parseFloat(imgBox.marginLeft) + parseFloat(imgBox.marginRight)
    }
    const need = ctx.measureText(option.textContent.trim()).width * 1.05
    if (need > room) scale = Math.min(scale, room / need)
  }
  if (scale < 1) container.style.fontSize = `${Math.max(MIN_FONT_PX, Math.floor(base * scale * 2) / 2)}px`
}

// Call after a group (re)renders its options into `container`.
export function applyOptionLayout(host, container) {
  if (host.getAttribute('layout') !== 'fit') return
  // Refit when the width changes (rotation, resize). Height changes are our own doing; ignore them.
  if (!container.__fitObserver) {
    let lastWidth = -1
    container.__fitObserver = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width)
      if (width === lastWidth) return
      lastWidth = width
      fitOptions(container)
    })
    container.__fitObserver.observe(container)
  }
  requestAnimationFrame(() => fitOptions(container))
}
