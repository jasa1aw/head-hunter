import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import './globals.css'
import ReduxProvider from './store/provider';

export default async function LocaleLayout({ children, params }) {
  const { locale } = params;

  // Проверяем, что переданная локаль допустима
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Получаем сообщения для текущей локали
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
