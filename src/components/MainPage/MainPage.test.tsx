import { makeStore } from '@/store/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, expect, it, vi } from 'vitest';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { setUser } from '@/store/features/currentUserSlice';
import MainPage from '@/components/MainPage/MainPage';
import useUserSession from '@/hooks/useUserSession';
import { describe } from 'node:test';
import { NextIntlClientProvider } from 'next-intl';

const store = makeStore();
const persistor = persistStore(store);

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
  };
});

vi.mock('@/hooks/useUserSession', () => ({
  default: vi.fn(),
}));

const customRender = (ui: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en">{ui}</NextIntlClientProvider>,
  );
};

describe('Main Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Main Page shows 7 links when user entered', async () => {
    vi.mocked(useUserSession).mockImplementation(() => 'ok');
    customRender(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainPage session={null} />
        </PersistGate>
      </Provider>,
    );
    expect(screen.getByText('Welcome', { exact: false })).toBeDefined();
    expect(screen.getAllByRole('link').length).toEqual(7);
  });

  it('Main Page shows user name when user entered', async () => {
    const user = 'name';
    store.dispatch(setUser(user));
    vi.mocked(useUserSession).mockImplementation(() => 'ok');
    customRender(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainPage session={null} />
        </PersistGate>
      </Provider>,
    );
    expect(screen.getByText(user, { exact: false })).toBeDefined();
  });

  it(`Main Page shows 6 links when user didn't enter`, async () => {
    vi.mocked(useUserSession).mockImplementation(() => null);
    customRender(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainPage session={null} />
        </PersistGate>
      </Provider>,
    );
    expect(screen.getAllByRole('link').length).toEqual(6);
  });
});
