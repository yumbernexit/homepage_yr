import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importa i file di traduzione
import translationEN from './locales/en/translation.json';
import translationIT from './locales/it/translation.json';
import majeekoEN from './locales/en/majeeko.json';
import majeekoIT from './locales/it/majeeko.json';


// Configura le risorse di traduzione
const resources = {
  en: {
    translation: translationEN,
    majeeko: majeekoEN
  },
  it: {
    translation: translationIT,
    majeeko: majeekoIT
  }
};

i18n
  .use(LanguageDetector) // Usa il language detector per rilevare la lingua dell'utente
  .use(initReactI18next) // Passa i18n a react-i18next.
  .init({
    resources, // Le risorse di traduzione
    fallbackLng: 'en', // Lingua di fallback in caso di mancanza di traduzioni
    interpolation: {
      escapeValue: false // React già protegge dall'iniezione di XSS
    }
  });

export default i18n;
