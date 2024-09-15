import { makeStore } from '@/store/store';
import { addRequest } from '@/store/features/requestListSlice';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { setUser } from '@/store/features/currentUserSlice';
import userEvent from '@testing-library/user-event';
import HistoryPage from '@/components/HistoryPage/HistoryPage';
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

const customRender = (ui: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en">{ui}</NextIntlClientProvider>,
  );
};

describe('History', () => {
  it('Shows message and two links when history is empty', async () => {
    customRender(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HistoryPage />
        </PersistGate>
      </Provider>,
    );
    expect(
      screen.getByText('There are no requests in the local storage'),
    ).toBeDefined();
    expect(screen.getAllByRole('link').length).toEqual(2);
  });

  it('Shows history if exists', async () => {
    const user = 'username';
    const url = 'https://countries.trevorblades.com/';
    store.dispatch(
      addRequest({
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
    store.dispatch(
      addRequest({
        user,
        date: 1726321575755,
        method: 'GRAPHQL',
        url,
        body: `query getcountry($code: ID!) {country(code: $code) {name capital}`,
        variables: {
          query: `{"code":"US"}`,
        },
        headers: {
          query: `{"content-type":"application/json"}`,
        },
      }),
    );
    store.dispatch(setUser(user));

    customRender(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HistoryPage />
        </PersistGate>
      </Provider>,
    );

    const tester = userEvent.setup();

    const el1 = screen.getByText('POST');
    expect(el1).toBeDefined();
    await tester.click(el1);

    const el2 = screen.getByText('GRAPHQL');
    expect(el2).toBeDefined();
    await tester.click(el2);
  });
});
