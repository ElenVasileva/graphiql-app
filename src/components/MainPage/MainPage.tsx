import Greeting from 'components/MainPage/Greeting/Greeting';
import styles from './MainPage.module.scss';
import SignLinks from 'components/MainPage/SignLinks/SignLinks';
import InformationBlock from 'components/MainPage/InformationBlock/InformationBlock';
import ContentLinks from 'components/MainPage/ContentLinks/ContentLinks';

const MainPage = ({ session }: { session: string | null }) => {
  return (
    <div className={styles.mainPage}>
      <Greeting />
      <SignLinks session={session} />
      <ContentLinks session={session} />
      <InformationBlock />
    </div>
  );
};

export default MainPage;
