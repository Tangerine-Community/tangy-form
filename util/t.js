export const t = (fragment) => {
  if (!window.translation) return fragment
  if (window.translation[fragment]) {
    return window.translation[fragment]
  } else {
    console.warn(`i18n: Translation not found for "${fragment}"`)
    return fragment
  }
}

