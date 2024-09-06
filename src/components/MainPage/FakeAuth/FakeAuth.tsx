'use client';
import { setUser } from '@store/features/userSlice';
import { RootState } from '@store/store';
import { Input } from 'components/Input';
import { useDispatch, useSelector } from 'react-redux';
import styles from './FakeAuth.module.scss';

const FakeAuth = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state: RootState) => state.user.value);

  return (
    <>
      User:
      <Input
        className={styles.user}
        type={'text'}
        name={''}
        onChange={(e) => dispatch(setUser(e.target.value))}
        defaultValue={userName}
      />
    </>
  );
};

export default FakeAuth;
