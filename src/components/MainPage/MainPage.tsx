import FakeAuth from 'components/MainPage/FakeAuth/FakeAuth';
import Greeting from 'components/MainPage/Greeting/Greeting';

import styles from './MainPage.module.scss';
import SignLinks from 'components/MainPage/SignLinks/SignLinks';
import InformationBlock from 'components/MainPage/InformationBlock/InformationBlock';

const MainPage = () => {
  return (
    <div className={styles.mainPage}>
      <FakeAuth />
      <Greeting />
      <SignLinks />
      <InformationBlock />
    </div>
  );
};

export default MainPage;
