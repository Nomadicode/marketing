'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';
import { LanguageSelect } from '@/app/components/layout/language-select';
import type { Locale } from '@/app/lib/site';

type NavLink = { href: string; label: string; active?: boolean };

export function MobileNav({
  links,
  bookCallLabel,
  bookCallHref,
  menuLabel,
  closeLabel,
  locale,
  currentPath,
  languageLabel,
}: {
  links: NavLink[];
  bookCallLabel: string;
  bookCallHref: string;
  menuLabel: string;
  closeLabel: string;
  locale: Locale;
  currentPath: string;
  languageLabel: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={menuLabel}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-md text-navy-foreground"
      >
        <Menu size={22} />
      </button>

      {isMounted &&
        createPortal(
          <>
            {/*
              Portaled to document.body: the header uses backdrop-blur,
              and backdrop-filter establishes a containing block for
              fixed-position descendants (like transform does), which
              would otherwise clip this to the header's own box instead
              of the viewport.
            */}
            <div
              aria-hidden="true"
              onClick={() => setIsOpen(false)}
              className={[
                'fixed inset-0 z-40 bg-black/60 transition-opacity duration-300',
                isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
              ].join(' ')}
            />

            <div
              role="dialog"
              aria-modal="true"
              aria-label={menuLabel}
              className={[
                'fixed inset-y-0 right-0 z-50 flex w-[82vw] max-w-[360px] flex-col',
                'border-l border-navy-border bg-navy-strong shadow-2xl',
                'transition-transform duration-300 ease-in-out',
                isOpen ? 'translate-x-0' : 'translate-x-full',
              ].join(' ')}
            >
              <div className="flex items-center justify-between border-b border-navy-border px-5 py-[18px]">
                <span className="text-sm font-semibold text-navy-foreground">
                  {menuLabel}
                </span>
                <button
                  type="button"
                  aria-label={closeLabel}
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-md text-navy-foreground"
                >
                  <X size={22} />
                </button>
              </div>

              <nav
                aria-label="Mobile"
                className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-6"
              >
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={[
                      'rounded-md px-2 py-3 text-lg',
                      link.active
                        ? 'font-semibold text-navy-foreground'
                        : 'text-navy-muted hover:text-navy-foreground',
                    ].join(' ')}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-4 flex items-center justify-between px-2">
                  <span className="text-xs text-navy-muted">
                    {languageLabel}
                  </span>
                  <LanguageSelect
                    locale={locale}
                    currentPath={currentPath}
                    label={languageLabel}
                  />
                </div>

                <Link
                  href={bookCallHref}
                  onClick={() => setIsOpen(false)}
                  className="mt-6 rounded-md bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-foreground"
                >
                  {bookCallLabel}
                </Link>
              </nav>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}
