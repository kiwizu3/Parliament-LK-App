import SINHALA_DICTIONARY from "./SINHALA_DICTIONARY.js";
import TAMIL_DICTIONARY from "./TAMIL_DICTIONARY.js";
const BASE_LANG = "en";

const LOCAL_STORAGE_KEY = 'parliament_lk_app.lang'

const DICTIONARY = {
  si: SINHALA_DICTIONARY,
  ta: TAMIL_DICTIONARY,
};

export const LANG_TO_LABEL = {
  si: "සිංහල",
  ta: "தமிழ்",
  en: "English",
};


export default class I18N {
  static getLang() {
    return localStorage.getItem(LOCAL_STORAGE_KEY);
  }

  static setLang(lang) {
    localStorage.setItem(LOCAL_STORAGE_KEY, lang);
  }

  static translate(s) {
    if (!s) {
      return s;
    }
    
    const lang = I18N.getLang();
    if (lang === BASE_LANG) {
      return s;
    }

    if (!DICTIONARY[lang]) {
      console.error('Unknown language: ' + lang);
      return s;
    }

    if (!DICTIONARY[lang][s]) {
      console.error(s);
      return s;
    }

    return DICTIONARY[lang][s];
  }
}

export function t(s) {
  return I18N.translate(s);
}
