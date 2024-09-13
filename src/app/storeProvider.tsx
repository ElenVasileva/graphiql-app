'use client';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Persistor, persistStore } from 'redux-persist';
import { useRef } from 'react';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current ??= makeStore();
  }

  const persistorRef = useRef<Persistor>();
  if (!persistorRef.current) {
    persistorRef.current ??= persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}
