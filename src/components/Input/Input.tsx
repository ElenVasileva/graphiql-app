'use client';

import styles from './Input.module.scss';
import classNames from 'classnames';
import { PasswordStrength } from '@/components/PasswordStrength';
import Image from 'next/image';
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import eye from '@/assets/icons/eye.svg';
import eyeOff from '@/assets/icons/eye-off.svg';
import { useState } from 'react';

type Props<T extends FieldValues> = {
  type: 'text' | 'password' | 'email';
  name: Path<T>;
  register?: UseFormRegister<T>;
  error?: FieldError;
  value?: string;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  password?: string;
  className?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
};

export const Input = <T extends FieldValues>(props: Props<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={classNames({
        [styles.wrapper]: true,
        [props.className as string]: !!props.className,
      })}
    >
      {props.label && (
        <label htmlFor={props.name} className={styles.label}>
          {props.label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input
          id={props.name}
          type={showPassword ? 'text' : props.type}
          className={classNames({
            [styles.input]: true,
            [styles.errorInput]: props.error,
          })}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          readOnly={props.readOnly}
          {...props.register?.(props.name)}
        />

        {props.type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.passwordEye}
          >
            <Image
              src={showPassword ? eyeOff : eye}
              alt={showPassword ? 'Hide password' : 'Show password'}
              height={24}
              width={24}
              priority
            />
          </button>
        )}

        {props.password && <PasswordStrength password={props.password} />}

        {props.error && <p className={styles.error}>{props.error.message}</p>}
      </div>
    </div>
  );
};
