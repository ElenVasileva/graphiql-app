import DeveloperCard from 'components/MainPage/InformationBlock/DeveloperCard/DeveloperCard';
import styles from './InformationBlock.module.scss';
import { useTranslations } from 'next-intl';

const InformationBlock = () => {
  const t = useTranslations('InformationBlock');

  return (
    <div className={styles.info}>
      <div className={styles.info__projectAndCourse}>
        <div className={styles.info__course}>
          <h3>{t('Course')}</h3>
          <div className={styles.info__course_content}>
            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
            >
              RSS React Course
            </a>
            &nbsp; {t('CourseContent')}
          </div>
        </div>
        <div className={styles.info__project}>
          <h3>{t('Project')}</h3>
          <div className={styles.info__project_content}>
            {t('ProjectContent')}
          </div>
        </div>
      </div>
      <div className={styles.info__developers}>
        <h3>{t('Developers')}</h3>
        <div className={styles.info__developers__content}>
          <DeveloperCard
            name={'Konstantin Svetashov'}
            gitLink={'insxmnea'}
            location={'Saratov, Russia'}
          ></DeveloperCard>
          <DeveloperCard
            name={'Elena Vasileva'}
            gitLink={'elenvasileva'}
            location={'Herceg Novi, Montenegro'}
          ></DeveloperCard>
          <DeveloperCard
            name={'Evgeniya Rodionova'}
            gitLink={'evvrod'}
            location={'Saint Petersburg, Russia'}
          ></DeveloperCard>
        </div>
      </div>
    </div>
  );
};

export default InformationBlock;
