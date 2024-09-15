import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { LocaleSwitcherSelect } from './LocaleSwitcherSelect';

export const LocaleSwitcher = () => {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          {t('locale', { locale: cur })}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
};
