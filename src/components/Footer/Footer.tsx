import { FC } from 'react';
import styles from './Footer.module.scss';
import Image from 'next/image';
import rssLogo from 'assets/icons/rss-logo.svg';

export const Footer: FC = () => {
  return (
    <footer className={styles.wrapper}>
      <a
        target="_blank"
        href="https://github.com/ElenVasileva/graphiql-app"
        className={styles.link}
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <span>© 2024 GraphiQL App</span>
      <Image src={rssLogo} alt="rss logo" className={styles.logo} />
    </footer>
  );
};
