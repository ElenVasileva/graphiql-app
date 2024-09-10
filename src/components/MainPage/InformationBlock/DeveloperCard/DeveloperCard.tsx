import styles from './DeveloperCard.module.scss';

const DeveloperCard = ({
  name,
  gitLink,
  location,
}: {
  name: string;
  gitLink: string;
  location: string;
}) => {
  return (
    <div className={styles.developerCard}>
      <div className={styles.name}>{name}</div>
      <a
        href={`https://github.com/${gitLink}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {gitLink}
      </a>
      <div>{location}</div>
    </div>
  );
};

export default DeveloperCard;
