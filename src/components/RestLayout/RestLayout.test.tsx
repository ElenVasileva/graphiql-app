import { expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RestLayout from './RestLayout';
import userEvent from '@testing-library/user-event';
import { makeStore } from '@/store/store';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NextIntlClientProvider } from 'next-intl';

const rawResponse = '{"name":"Luke Skywalker","height":"172","mass":"77"}';

const goodResult = {
  status: 200,
  json: () => {
    return {
      status: 200,
      body: rawResponse,
    };
  },
};

global.fetch = vi.fn().mockResolvedValue(goodResult);

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation');
  return {
    ...actual,
    useSearchParams: vi.fn(() => ({
      entries: vi.fn(() => [['content-type', 'application/json']]),
    })),
  };
});

vi.mock('@/i18n/routing', () => {
  const actual = vi.importActual('@/i18n/routing');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
    usePathname: vi.fn(() => '/restful/post/'),
  };
});

const store = makeStore();
const persistor = persistStore(store);

const customRender = (ui: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en">{ui}</NextIntlClientProvider>,
  );
};

it('RestLayout', async () => {
  customRender(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RestLayout />
      </PersistGate>
    </Provider>,
  );

  const user = userEvent.setup();

  await user.selectOptions(screen.getByRole('combobox'), ['get']);

  await user.type(
    screen.getByPlaceholderText('Enter URL or paste the text'),
    'new-url',
  );
  expect(screen.getByDisplayValue('new-url', { exact: false })).toBeDefined();

  await user.type(screen.getByPlaceholderText('Key'), 'search');
  expect(screen.getByDisplayValue('search')).toBeDefined();

  await user.click(screen.getByText('Headers'));
  await user.type(screen.getByDisplayValue('content-type'), 'Test');
  expect(screen.getByDisplayValue('content-typeTest')).toBeDefined();

  await user.click(screen.getByText('Body'));
  await user.click(screen.getByAltText('Prettify'));

  await user.click(screen.getByText('Variables'));
  await user.type(screen.getByPlaceholderText('Key'), 'search');
  expect(screen.getByDisplayValue('search')).toBeDefined();

  await user.click(screen.getByText('Send'));
  expect(
    screen.getByDisplayValue('Luke Skywalker', { exact: false }),
  ).toBeDefined();
});
