import { usePathname } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import parseUrl from 'utils/parseUrl';

export default function useUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [params, setParams] = useState<{
    type: string;
    endpoint: string;
    query: string;
    variables: Record<string, string>;
    headers: Record<string, string>;
  }>(parseUrl(pathname, searchParams));

  useEffect(() => {
    setParams(parseUrl(pathname, searchParams));
  }, [pathname, searchParams]);

  return params;
}
