import { config } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import frFR from '@/locales/fr-FR.json'
import enUS from '@/locales/en-US.json'
import esES from '@/locales/es-ES.json'

const i18n = createI18n({
  legacy: false,
  locale: 'fr-FR',
  fallbackLocale: 'en-US',
  messages: {
    'fr-FR': frFR,
    'en-US': enUS,
    'es-ES': esES,
  },
})

config.global.plugins = [i18n]
