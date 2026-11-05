// Author text (label, hint, error, warning) as it should appear on screen.
// An editor round trip can write a missing value out as the word "undefined" or "null".
// Neither is something a form author typed, so neither is shown.
export function cleanText(value) {
  const text = value == null ? '' : String(value)
  const word = text.trim()
  return word === 'undefined' || word === 'null' ? '' : text
}
