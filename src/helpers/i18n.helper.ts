import { createI18n } from 'vue-i18n'
import frFR from '@/locales/fr-FR.json'
import enUS from '@/locales/en-US.json'
import esES from '@/locales/es-ES.json'

export function setupI18n(locale = 'fr-FR') {
  const i18n = createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en-US',
    messages: {
      'fr-FR': frFR,
      'en-US': enUS,
      'es-ES': esES,
    },
  })

  return i18n
}
