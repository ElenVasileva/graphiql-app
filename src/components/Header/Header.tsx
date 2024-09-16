'use client';

import { FC } from 'react';
import styles from './Header.module.scss';
import useUserSession from 'hooks/useUserSession';
import { logout, removeSession } from 'services/firebase';
import { Button } from 'components/Button';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from 'constants/routes';
import { ButtonLink } from 'components/ButtonLink';
import { useAppDispatch } from '@/store/hooks';
import { useEffect } from 'react';
import { setUser } from '@/store/features/currentUserSlice';
import { getUserName } from 'services/firebase';
import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';

type Props = {
  session: string | null;
};

export const Header: FC<Props> = (props) => {
  const t = useTranslations('Header');

  const userSessionId = useUserSession(props.session);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const name = await getUserName(props.session);
      dispatch(setUser(name));
    })();
  }, [props.session, dispatch]);

  const handleSignOut = async () => {
    await logout();
    await removeSession();
  };

  return (
    <header className={styles.wrapper}>
      <ButtonLink text={t('Home')} href="/" />

      <div className={styles.buttons}>
        <LocaleSwitcher />

        {userSessionId ? (
          <Button text={t('SignOut')} onClick={handleSignOut} />
        ) : (
          <div className={styles.buttons}>
            <ButtonLink text={t('SignIn')} href={LOGIN_ROUTE} />
            <ButtonLink text={t('SignUp')} href={REGISTRATION_ROUTE} />
          </div>
        )}
      </div>
    </header>
  );
};
