import i18n from 'i18n-js';

const translations = {
  ua: () => require("./translations/ua.json"),
}

export const prepareTranslations = (locale) => {

  i18n.fallbacks = true;
  i18n.translations = {
    [locale]: translations[locale](),
  };
  i18n.locale = locale;
  i18n.missingTranslation = (name) => name;
}

export default i18n;
