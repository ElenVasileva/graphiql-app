import styles from './TabButtons.module.scss';
import { Button } from '@/components/Button';
import { useState } from 'react';

const TabButtons = ({
  nameList,
  defaultName,
  onChange,
}: {
  nameList: string[];
  defaultName: string | undefined;
  onChange: (name: string) => void;
}) => {
  const [name, setName] = useState<string>(defaultName || nameList[0]);

  const onClick = (newName: string) => {
    setName(newName);
    onChange(newName);
  };

  return (
    <div className={styles.tabButtons}>
      {nameList.map((mode) => (
        <Button
          className={name === mode ? styles.active : ''}
          onClick={() => onClick(mode)}
          key={mode}
        >
          {mode.toString()}
        </Button>
      ))}
    </div>
  );
};
export default TabButtons;
