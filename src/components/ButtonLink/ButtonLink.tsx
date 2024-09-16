import { FC } from 'react';
import styles from './ButtonLink.module.scss';
import { Link } from '@/i18n/routing';

type Props = {
  href: string;
  text: string;
};

export const ButtonLink: FC<Props> = (props) => {
  return (
    <Link href={props.href} className={styles.link}>
      {props.text}
    </Link>
  );
};
