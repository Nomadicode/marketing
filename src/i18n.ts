import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './lang/en.json';
import es from './lang/es.json';

import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        lng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: {translation: en},
            es: {translation: es}
        }
    });

export default i18n;

