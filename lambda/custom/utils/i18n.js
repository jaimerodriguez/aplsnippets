const Jargon = require('@jargon/sdk-core');
const { AlexaUtils } = require('./skillhelpers');

class I18N {
  constructor(locale) {
    const factory = new Jargon.DefaultResourceManagerFactory({});
    this.resourceManager = factory.forLocale(locale);
    this.locale = locale;
  }

  async ri(key, params, options) {
    const riResult = Jargon.ri(key, params, options);
    return this.resourceManager.render(riResult);
  }

  getMultiLocalePath(resourceName) {
    return `${resourceName}.${this.locale.replace('-', '.')}`;
  }
}


const resources = new Map();

/* eslint no-param-reassign: ["error", { "props": false }] */
const LocaleInterceptor = function LocaleInterceptor(handlerInput) {
  const locale = AlexaUtils.getLocale(handlerInput);
  if (!resources.has(locale)) {
    resources.set(locale, new I18N(locale));
  }
  handlerInput.responseBuilder.i18n = resources.get(locale);
};

module.exports = {
  I18N: I18N,
  LocaleInterceptor: LocaleInterceptor,
};
