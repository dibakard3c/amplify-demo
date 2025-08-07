'use client';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from '@estia/store/store';
import { persistStore, Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { setupListeners } from '@reduxjs/toolkit/query';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  const persistStoreRef = useRef<Persistor>(undefined);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    persistStoreRef.current = persistStore(storeRef.current);
    setupListeners(storeRef.current.dispatch);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate persistor={persistStoreRef.current!}>{children}</PersistGate>
    </Provider>
  );
}
