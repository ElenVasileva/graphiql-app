import { FC } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

type Props = {
  text?: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export const Button: FC<Props> = (props) => {
  return (
    <button
      className={classNames({
        [styles.button]: true,
        [props.className as string]: !!props.className,
      })}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text || props.children}
    </button>
  );
};
