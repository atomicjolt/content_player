import LocalizedStrings from 'react-localization';
import locales          from '../locales/locales';

/**
 * Returns localized strings based on 'locale' setting
 */
export function localizeStrings(state, props) {
  var lang = state.content.tocMeta.language || state.settings.locale;
  var strings = new LocalizedStrings(locales());
  strings.setLanguage(lang);
  return strings;
};
