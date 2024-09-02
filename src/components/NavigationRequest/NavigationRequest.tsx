import styles from './NavigationRequest.module.scss';

const navigationList: {
  key: 'headers' | 'query' | 'variables' | undefined;
  value: string;
}[] = [
  { key: 'headers', value: 'Headers' },
  { key: 'query', value: 'Query' },
  { key: 'variables', value: 'Variables' },
];

interface INavigationRequestProps {
  visibleSection: 'headers' | 'query' | 'variables' | undefined;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function NavigationRequest(props: INavigationRequestProps) {
  const { onClick, visibleSection } = props;

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
          {item.value}
        </button>
      ))}
    </div>
  );
}
