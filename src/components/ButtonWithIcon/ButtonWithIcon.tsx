import Image from 'next/image';

import styles from './ButtonWithIcon.module.scss';

interface IButtonWithIcon {
  onClick?: () => void;
  disabled?: boolean;
  icon: string;
}

export default function ButtonWithIcon(props: IButtonWithIcon) {
  const { icon, disabled, onClick } = props;

  return (
    <button
      className={styles.button}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      <Image width="16" src={icon} alt="Play" />
    </button>
  );
}
