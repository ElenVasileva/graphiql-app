import { render, screen } from '@testing-library/react';
import { LocaleSwitcher } from './LocaleSwitcher';
import { useLocale, useTranslations } from 'next-intl';
import { routing, usePathname, useRouter } from '@/i18n/routing';
import { describe, it, vi, expect, beforeEach, Mock, afterEach } from 'vitest';

vi.mock('next-intl', () => ({
  useLocale: vi.fn(),
  useTranslations: vi.fn(),
}));

vi.mock('@/i18n/routing', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  routing: {
    locales: [],
  },
}));

describe('LocaleSwitcher', () => {
  const localesMock: readonly ['en', 'ru'] = ['en', 'ru'] as const;
  const mockRouterReplace = vi.fn();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({
      replace: mockRouterReplace,
    });
    (usePathname as Mock).mockReturnValue('/test-path');

    routing.locales = localesMock;

    (useLocale as Mock).mockReturnValue('en');
    (useTranslations as Mock).mockReturnValue(
      (key: string, { locale }: { locale: string }) => {
        return locale === 'en' ? 'English' : 'Русский';
      },
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render LocaleSwitcherSelect with default locale', () => {
    render(<LocaleSwitcher />);

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select.value).toBe('en');
  });

  it('should render options with correct locales and translations', () => {
    render(<LocaleSwitcher />);

    const englishOption = screen.getByRole('option', {
      name: 'English',
    }) as HTMLOptionElement;
    const russianOption = screen.getByRole('option', {
      name: 'Русский',
    }) as HTMLOptionElement;

    expect(englishOption).toBeInTheDocument();
    expect(englishOption.value).toBe('en');

    expect(russianOption).toBeInTheDocument();
    expect(russianOption.value).toBe('ru');
  });
});
