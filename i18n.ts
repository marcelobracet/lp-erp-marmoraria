import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !['pt-br', 'en'].includes(locale)) {
    locale = 'pt-br';
  }

  return {
    locale,
    messages: (await import(`./src/messages/${locale}/landing.json`)).default,
  };
});
