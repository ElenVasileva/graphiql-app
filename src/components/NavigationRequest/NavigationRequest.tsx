import { useTranslations } from 'next-intl';

import styles from './NavigationRequest.module.scss';

const navigationList: {
  key: 'headers' | 'query' | 'variables' | undefined;
  value: string;
}[] = [
  { key: 'query', value: 'Query' },
  { key: 'headers', value: 'Headers' },
  { key: 'variables', value: 'Variables' },
];

interface INavigationRequestProps {
  visibleSection: 'headers' | 'query' | 'variables' | undefined;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function NavigationRequest(props: INavigationRequestProps) {
  const { onClick, visibleSection } = props;
  const t = useTranslations('NavigationRequest');

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick(event);
  }

  return (
    <div className={styles['navigation-list']}>
      {navigationList.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`${styles.button} ${visibleSection === item.key ? styles.active : ''}`}
          onClick={handleClick}
          name={item.key}
        >
          {t(`${item.value}`)}
        </button>
      ))}
    </div>
  );
}
