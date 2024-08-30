'use client';

import { useState } from 'react';

type UseLocalStorage<T> = [T[] | undefined, (value: T) => void];

export default function useLocalStorage<T>(key: string): UseLocalStorage<T> {
  const [items, setItems] = useState(() => getValue());

  function setValue(value: T) {
    try {
      const currentLS = items;
      const newLS = currentLS ? [...currentLS, value] : [value];
      window.localStorage.setItem(key, JSON.stringify(newLS));
      setItems(newLS);
    } catch (error) {}
  }

  function getValue(): T[] | undefined {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return undefined;
      const array = JSON.parse(item);
      return array;
    } catch (error) {
      return undefined;
    }
  }

  return [items, setValue];
}
