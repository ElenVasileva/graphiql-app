import { expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RestLayout from './RestLayout';
import userEvent from '@testing-library/user-event';

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
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      entries: vi.fn(() => [['content-type', 'application/json']]),
    })),
    usePathname: vi.fn(() => '/restful/post/'),
  };
});

it('RestLayout', async () => {
  render(<RestLayout />);
  const user = userEvent.setup();

  await user.selectOptions(screen.getByRole('combobox'), ['get']);

  await user.type(
    screen.getByPlaceholderText('Enter URL or paste the text'),
    'new-url',
  );
  expect(screen.getByDisplayValue('new-url')).toBeDefined();

  await user.type(screen.getByPlaceholderText('Key'), 'search');
  expect(screen.getByDisplayValue('search')).toBeDefined();

  await user.click(screen.getByText('Headers'));
  await user.type(screen.getByPlaceholderText('Key'), 'search');
  expect(screen.getByDisplayValue('search')).toBeDefined();

  await user.click(screen.getByText('Body'));
  await user.type(screen.getAllByRole('textbox')[1], 'qwerty');

  await user.click(screen.getByText('Variables'));
  await user.type(screen.getByPlaceholderText('Key'), 'search');
  expect(screen.getByDisplayValue('search')).toBeDefined();

  await user.click(screen.getByText('Send'));
  expect(
    screen.getByDisplayValue('Luke Skywalker', { exact: false }),
  ).toBeDefined();
});
