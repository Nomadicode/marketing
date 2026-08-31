'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { Locale } from '@/app/lib/site';

const languages: Array<{ code: Locale; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

export function LanguageSelect({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const changeLanguage = (nextLocale: Locale) => {
    const remainder = pathname.replace(/^\/es(?=\/|$)/, '') || '/';
    router.push(nextLocale === 'en' ? remainder : `/es${remainder}`);
  };
  return (
    <label className="language-select">
      <span className="sr-only">{label}</span>
      <select
        value={locale}
        onChange={(event) => changeLanguage(event.target.value as Locale)}
        aria-label={label}
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </label>
  );
}
