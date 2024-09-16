import { FC, useEffect, useState } from 'react';
import styles from './PasswordStrength.module.scss';

type Props = {
  password: string;
};

export const evaluatePasswordStrength = (password: string) => {
  let score = 0;
  if (!password) return 0;

  const conditions = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  conditions.forEach((condition) => {
    if (condition) score += 1;
  });

  return score * (100 / conditions.length);
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
      <svg
        viewBox="0 0 24 24"
        className={styles.svg}
        data-testid="password-strength-svg"
      >
        <circle r={R} cx="50%" cy="50%" opacity={0.2} />
        <circle
          r={R}
          cx="50%"
          cy="50%"
          strokeDasharray={LENGTH}
          strokeDashoffset={offset}
          className={styles.strength}
          data-testid="strength-circle"
        />
      </svg>
    </div>
  );
};
