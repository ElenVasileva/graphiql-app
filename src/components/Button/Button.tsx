import { FC } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

type Props = {
  text: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  disabled?: boolean;
};

export const Button: FC<Props> = (props) => {
  return (
    <button
      className={classNames({
        [styles.button]: true,
        [styles.submit]: props.type === 'submit',
      })}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};
