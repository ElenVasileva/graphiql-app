import RestHistory from '@/components/HistoryPage/RestHistory/RestHistory';
import { makeStore } from '@/store/store';
import { addRestRequest } from '@/store/features/restRequestsSlice';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { expect, it, vi } from 'vitest';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { setUser } from '@/store/features/currentUserSlice';
import userEvent from '@testing-library/user-event';

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

it('Empty Rest History', async () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RestHistory />
      </PersistGate>
    </Provider>,
  );
  expect(
    screen.getByText('There are no REST requests in the local storage'),
  ).toBeDefined();
  expect(screen.getByRole('link')).toBeDefined();
});

it('User Rest History', async () => {
  const user = 'name';
  const url = 'name';
  store.dispatch(
    addRestRequest({
      user,
      date: 1726321575754,
      method: 'post',
      url,
      body: `{ "query": "{{query}}", "variables": {} }`,
      variables: {
        query: `{"query":"query {country(code: \\\"RU\\\") {name capital}}"}`,
      },
    }),
  );
  store.dispatch(setUser(user));

  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RestHistory />
      </PersistGate>
    </Provider>,
  );

  const tester = userEvent.setup();

  const urlEl = screen.getByText(url);
  expect(urlEl).toBeDefined();
  await tester.click(urlEl);
});
