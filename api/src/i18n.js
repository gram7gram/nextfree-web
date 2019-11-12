const i18n = require('i18n-js');

const translations = {
  ua: () => require("./translations/ua.json"),
}

const prepareTranslations = (locale) => {

  if (translations[locale] === undefined) {
    throw new Error(`Locale '${locale}' is not supported`)
  }

  i18n.fallbacks = true;
  i18n.translations = {
    [locale]: translations[locale](),
  };
  i18n.locale = locale;
  i18n.missingTranslation = (name) => name;
}

module.exports = {
  i18n,
  prepareTranslations,
}
