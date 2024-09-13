import DeveloperCard from 'components/MainPage/InformationBlock/DeveloperCard/DeveloperCard';
import styles from './InformationBlock.module.scss';

const InformationBlock = () => {
  return (
    <div className={styles.info}>
      <div className={styles.info__projectAndCourse}>
        <div className={styles.info__course}>
          <h3>Course</h3>
          <div className={styles.info__course_content}>
            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
            >
              RSS React Course
            </a>
            &nbsp;is a free React course from Rolling Scope School. Everyone can
            study at RS School. But you should have sufficient base knowledge
            before the program begins. After successful completion of the
            course, students will receive an electronic certificate.
          </div>
        </div>
        <div className={styles.info__project}>
          <h3>Project</h3>
          <div className={styles.info__project_content}>
            This project `REST and GraphQL client` was performed as part of the
            final assignment of the course.
          </div>
        </div>
      </div>
      <div className={styles.info__developers}>
        <h3>Developers</h3>
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
