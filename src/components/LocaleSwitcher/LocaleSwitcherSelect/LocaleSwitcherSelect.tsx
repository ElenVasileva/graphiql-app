'use client';

import { ChangeEvent, ReactNode, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import styles from './LocaleSwitcherSelect.module.scss';

type Props = {
  children: ReactNode;
  defaultValue: string;
};

export const LocaleSwitcherSelect = ({ children, defaultValue }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as 'en' | 'ru';
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <label className={styles.wrapper}>
      <select
        className={styles.select}
        id="locale"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
    </label>
  );
};
