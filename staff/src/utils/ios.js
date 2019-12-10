export const isIPhone = () =>
  !!navigator.platform && /iPhone/.test(navigator.platform);

export const isSafari = () =>
  navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
  navigator.userAgent &&
  navigator.userAgent.indexOf('CriOS') === -1 &&
  navigator.userAgent.indexOf('FxiOS') === -1;