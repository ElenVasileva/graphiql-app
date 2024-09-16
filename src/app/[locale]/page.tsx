import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from 'constants/sessionCookie';

import MainPage from 'components/MainPage/MainPage';

export default function HomePage() {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;

  return <MainPage session={session} />;
}
