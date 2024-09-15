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
describe('Main Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('MainPage', async () => {
    vi.mocked(useUserSession).mockImplementation(() => 'ok');
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainPage session={null} />
        </PersistGate>
      </Provider>,
    );
    expect(screen.getByText('Welcome!')).toBeDefined();
    expect(screen.getByText('Developers')).toBeDefined();
    expect(screen.getAllByRole('link').length).toEqual(7);
  });

  it('MainPage', async () => {
    const user = 'name';
    store.dispatch(setUser(user));
    vi.mocked(useUserSession).mockImplementation(() => 'ok');
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainPage session={null} />
        </PersistGate>
      </Provider>,
    );
    expect(screen.getByText('Welcome Back', { exact: false })).toBeDefined();
    expect(screen.getByText('Developers')).toBeDefined();
    expect(screen.getAllByRole('link').length).toEqual(7);
  });

  it('MainPage', async () => {
    vi.mocked(useUserSession).mockImplementation(() => null);
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainPage session={null} />
        </PersistGate>
      </Provider>,
    );
    expect(screen.getByText('Developers')).toBeDefined();
    expect(screen.getAllByRole('link').length).toEqual(6);
  });
});
