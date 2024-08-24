import { FC, useEffect, useState } from 'react';
import styles from './PasswordStrength.module.scss';

type Props = {
  password: string;
};

const evaluatePasswordStrength = (password: string) => {
  let score = 0;
  if (!password) return 0;

  if (password.length > 8) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  switch (score) {
    case 0:
      return 0;
    case 1:
      return 20;
    case 2:
      return 40;
    case 3:
      return 60;
    case 4:
      return 80;
    case 5:
      return 100;
    default:
      return 0;
  }
};

const R = 9;
const LENGTH = R * 3.14 * 2;

export const PasswordStrength: FC<Props> = (props) => {
  const [offset, setOffset] = useState(LENGTH);

  useEffect(() => {
    const strength = evaluatePasswordStrength(props.password);
    setOffset((LENGTH * (100 - strength)) / 100);
  }, [props.password]);

  return (
    <div className={styles.wrapper}>
      <svg viewBox="0 0 24 24" className={styles.svg}>
        <circle r={R} cx="50%" cy="50%" opacity={0.2} />
        <circle
          r={R}
          cx="50%"
          cy="50%"
          strokeDasharray={LENGTH}
          strokeDashoffset={offset}
          className={styles.strength}
        />
      </svg>
    </div>
  );
};
