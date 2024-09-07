'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'services/firebase';

const useUserSession = (InitSession: string | null) => {
  const [userUid, setUserUid] = useState<string | null>(InitSession);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUserUid(authUser.uid);
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return userUid;
};

export default useUserSession;
