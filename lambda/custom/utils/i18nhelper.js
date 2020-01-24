
const Alexa = require('ask-sdk-core');

const { Utils } = require('./skillhelpers.js');

const gLoadedLocales = new Map();
const gLocaleFiles = new Map([
  ['en', '../skill/resources/en-US.json'],
]);

class I18nHelper {
  constructor(localeParam) {
    this.locale = localeParam;
    this.resources = I18nHelper.loadResourceFile(this.locale);
  }

  // TODO: Remove..
  ri(name) {
    return this.s(name);
  }

  s(name) {
    let resource = null;
    const hierarchical = name.split('.');
    if (hierarchical.length === 1) {
      resource = this.resources.strings[name];
    } else if (hierarchical.length === 2) {
      resource = this.resources.strings[hierarchical[0]][hierarchical[1]];
    } else {
      let resolved = this.resources.strings[hierarchical[0]];
      for (let i = 1; i < hierarchical.length; i += 1) {
        resolved = resolved[hierarchical[i]];
      }
      resource = resolved;
    }


    if (Array.isArray(resource)) {
      // const index = getRandomIntInRange ( resources.length );
      const index = Utils.getRandomInt(resource.length);
      return resource[index];
    }

    console.assert(resource !== null , `missing string: ${name}`);
    return resource;
  }

  get activeLocale() {
    return this.locale;
  }



  sformat(name, ...args) {
    let placeholder = this.s(name);
    for (let x = 0; x < args.length; x += 1) {
      const item = `{${x}}`;
      placeholder = placeholder.replace(item, args[x]);
    }
    return placeholder;
  }

  static a(audioname) {
    // TODO: implement
    console.log(audioname);
  }

  static get Locales() {
    return gLoadedLocales;
  }

  static get LocaleFiles() {
    return gLocaleFiles;
  }

  static loadResourceFile(locale) {
    if (I18nHelper.Locales.has(locale)) { return I18nHelper.Locales.get(locale); }

    let resourceFile = '';
    if (I18nHelper.LocaleFiles.has(locale)) {
      resourceFile = I18nHelper.LocaleFiles.get(locale);
    } else {
      const languagePrefix = locale.substring(0, 2);
      if (I18nHelper.LocaleFiles.has(languagePrefix)) {
        resourceFile = I18nHelper.LocaleFiles.get(languagePrefix);
      }
    }

    if (resourceFile !== '') {
      // eslint-disable global-require
      // eslint-disable-next-line import/no-dynamic-require
      const resources = require(resourceFile);

      // es-lint-enable global-require
      I18nHelper.Locales.set(locale, resources);
      return resources;
    }


    console.assert(false, 'This should not happen at run-time. It must be developer misconfiguration');
    return null;
  }
}


function localeInterceptor(handlerInput) {
  const locale = Alexa.getLocale(handlerInput.requestEnvelope);
  const localizer = new I18nHelper(locale);

  // eslint-disable-next-line no-param-reassign
  handlerInput.responseBuilder.i18n = localizer;
}


module.exports = {
  I18N: I18nHelper,
  localeInterceptor: localeInterceptor,
};
