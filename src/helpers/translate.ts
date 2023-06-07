import overrideTranslations from '../translations/translations.json';
import defaultTranslations from '../translations/default.json';

type TranslationsType = keyof typeof defaultTranslations;

export function t(
  keyName: TranslationsType,
  variables?: Record<string, any>
): string;

export function t(keyName: string, variables?: Record<string, any>): string;

export function t(
  keyName: TranslationsType | string,
  variables?: Record<string, any>
): string {
  let translation =
    (overrideTranslations[
      keyName as keyof typeof overrideTranslations
    ] as string) || undefined;
  if (!translation) {
    translation =
      defaultTranslations[keyName as keyof typeof defaultTranslations];
  }

  if (translation) {
    if (variables) {
      Object.keys(variables).forEach((variableName) => {
        translation = translation?.replace(
          new RegExp(`\\[${variableName}\\]`, 'g'),
          variables[variableName]
        );
      });
    }
    return translation;
  } else {
    console.warn(`Translation for key ${keyName} not found`);
  }
  return keyName;
}
