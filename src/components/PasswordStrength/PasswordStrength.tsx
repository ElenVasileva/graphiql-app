import { FC } from 'react';
import styles from './PasswordStrength.module.scss';

type Props = {
  password: string;
};

const evaluatePasswordStrength = (password: string): string => {
  let score = 0;
  if (!password) return '';

  if (password.length > 8) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  switch (score) {
    case 0:
    case 1:
    case 2:
      return 'weak';
    case 3:
    case 4:
      return 'medium';
    case 5:
      return 'strong';
    default:
      return 'weak';
  }
};

export const PasswordStrength: FC<Props> = (props) => {
  return (
    <div className={styles.wrapper}>
      strength: {evaluatePasswordStrength(props.password)}
    </div>
  );
};
