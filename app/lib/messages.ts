import en from '@/messages/en.json';
import es from '@/messages/es.json';
import type { Locale } from './site';

const messages = { en, es } as const;
export type Messages = (typeof messages)['en'];

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
