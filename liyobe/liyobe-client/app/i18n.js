/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line
const enLocaleData = require('react-intl/locale-data/en');
const viLocaleData = require('react-intl/locale-data/vi');
const koLocaleData = require('react-intl/locale-data/ko');
const jaLocaleData = require('react-intl/locale-data/ja');
const zhLocaleData = require('react-intl/locale-data/zh');

const enTranslationMessages = require('./translations/en.json');
const viTranslationMessages = require('./translations/vi.json');
const koTranslationMessages = require('./translations/ko.json');
const jaTranslationMessages = require('./translations/ja.json');
const zhTranslationMessages = require('./translations/zh.json');

addLocaleData([...enLocaleData, ...viLocaleData,...koLocaleData, ...jaLocaleData,...zhLocaleData]);
// addLocaleData(enLocaleData);
// addLocaleData(viLocaleData);
// addLocaleData(koLocaleData);
// addLocaleData(jaLocaleData);
// addLocaleData(zhLocaleData);

const DEFAULT_LOCALE = 'en';

// prettier-ignore
const appLocales = [
  'en',
  'vi',
];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  vi: formatTranslationMessages('vi', viTranslationMessages),
  ko: formatTranslationMessages('ko', koTranslationMessages),
  ja: formatTranslationMessages('ja', jaTranslationMessages),
  zh: formatTranslationMessages('zh', zhTranslationMessages),
};

exports.appLocales = appLocales;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
