import overrideTranslations from '../translations/translations.json';
import defaultTranslations from '../translations/default.json';

type TranslationsType = keyof typeof defaultTranslations;

export function t(keyName: TranslationsType): string {
  const translation =
    overrideTranslations[keyName as keyof typeof overrideTranslations] ||
    undefined;
  if (translation) {
    return translation;
  }

  if (defaultTranslations[keyName]) {
    return defaultTranslations[keyName];
  }

  return keyName;
}
